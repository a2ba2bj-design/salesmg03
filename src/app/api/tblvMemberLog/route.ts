import { NextRequest } from "next/server";
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

// تابع کمکی برای مدیریت خطا
function handlePrismaError(error: unknown): { message: string; status: number } {
  console.error('Database error:', error);
  
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        return { message: 'رکورد تکراری وجود دارد', status: 409 };
      case 'P2025':
        return { message: 'رکورد مورد نظر یافت نشد', status: 404 };
      case 'P2003':
        return { message: 'خطای ارجاع خارجی', status: 400 };
      default:
        return { message: `خطای پایگاه داده: ${error.code}`, status: 400 };
    }
  }

  if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    return { message: 'خطای ناشناخته پایگاه داده', status: 500 };
  }

  if (error instanceof Prisma.PrismaClientRustPanicError) {
    return { message: 'خطای سیستمی پایگاه داده', status: 500 };
  }

  if (error instanceof Prisma.PrismaClientInitializationError) {
    return { message: 'خطای اتصال به پایگاه داده', status: 500 };
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return { message: 'داده‌های ارسالی معتبر نیستند', status: 400 };
  }

  if (error instanceof Error) {
    return { message: error.message, status: 500 };
  }

  return { message: 'خطای سرور داخلی', status: 500 };
}

// تابع حذف MemberLog
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const memberLogId = parseInt(id);

    if (isNaN(memberLogId) || memberLogId <= 0) {
      return Response.json(
        { error: 'شناسه MemberLog معتبر نیست' },
        { status: 400 }
      );
    }

    await prisma.tblvMemberLog.delete({
      where: { MemberLogID: memberLogId }
    });

    return new Response(null, { status: 204 });

  } catch (error) {
    const { message, status } = handlePrismaError(error);
    return Response.json({ error: message }, { status });
  }
}

// تابع دریافت MemberLog ها
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const memberId = searchParams.get('MemberID');
    const loginPostId = searchParams.get('LoginPostID');
    const isActive = searchParams.get('ISActive');
    const startDate = searchParams.get('StartDate');
    const endDate = searchParams.get('EndDate');

    let whereCondition: Prisma.tblvMemberLogWhereInput = {};

    // فیلتر بر اساس MemberID
    if (memberId) {
      whereCondition.MemberID = parseInt(memberId);
    }

    // فیلتر بر اساس LoginPostID
    if (loginPostId) {
      whereCondition.LoginPostID = parseInt(loginPostId);
    }

    // فیلتر بر اساس وضعیت فعال بودن
    if (isActive !== null && isActive !== undefined) {
      whereCondition.ISActive = parseInt(isActive);
    }

    // فیلتر بر اساس بازه تاریخ
    if (startDate || endDate) {
      whereCondition.LoginDate = {};
      
      if (startDate) {
        whereCondition.LoginDate.gte = new Date(startDate);
      }
      
      if (endDate) {
        whereCondition.LoginDate.lte = new Date(endDate);
      }
    }

    const memberLogs = await prisma.tblvMemberLog.findMany({
      where: Object.keys(whereCondition).length > 0 ? whereCondition : undefined,
      orderBy: { MemberLogID: 'desc' },
      include: {
        tblvMember: {
          select: {
            UserName: true,
            MemberID: true
          }
        },
        tblvPost: {
          select: {
            PostNameEN: true,
            PostNameFA: true,
            PostID: true
          }
        }
      }
    });

    return new Response(JSON.stringify(memberLogs), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    const { message, status } = handlePrismaError(error);
    return Response.json({ error: message }, { status });
  }
}

// تابع ایجاد MemberLog جدید
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // دریافت فیلدهای اجباری
    const memberId = formData.get('MemberID');
    const loginPostId = formData.get('LoginPostID');
    const loginDate = formData.get('LoginDate');

    // اعتبارسنجی فیلدهای اجباری
    if (!memberId || !loginPostId || !loginDate) {
      return Response.json(
        { error: "فیلدهای MemberID, LoginPostID و LoginDate اجباری هستند" },
        { status: 400 }
      );
    }

    const memberIdValue = parseInt(memberId.toString());
    const loginPostIdValue = parseInt(loginPostId.toString());
    const loginDateValue = new Date(loginDate.toString());

    // اعتبارسنجی مقادیر عددی
    if (isNaN(memberIdValue) || memberIdValue <= 0) {
      return Response.json(
        { error: "MemberID باید یک عدد معتبر باشد" },
        { status: 400 }
      );
    }

    if (isNaN(loginPostIdValue) || loginPostIdValue <= 0) {
      return Response.json(
        { error: "LoginPostID باید یک عدد معتبر باشد" },
        { status: 400 }
      );
    }

    // اعتبارسنجی تاریخ
    if (isNaN(loginDateValue.getTime())) {
      return Response.json(
        { error: "LoginDate باید یک تاریخ معتبر باشد" },
        { status: 400 }
      );
    }

    // بررسی وجود Member و Post
    const memberExists = await prisma.tblvMember.findUnique({
      where: { MemberID: memberIdValue }
    });

    if (!memberExists) {
      return Response.json(
        { error: "کاربر مورد نظر یافت نشد" },
        { status: 404 }
      );
    }

    const postExists = await prisma.tblvPost.findUnique({
      where: { PostID: loginPostIdValue }
    });

    if (!postExists) {
      return Response.json(
        { error: "پست مورد نظر یافت نشد" },
        { status: 404 }
      );
    }

    // دریافت فیلدهای اختیاری
    const isActive = formData.get('ISActive');
    const logOutDate = formData.get('LogOutDate');
    const temp1 = formData.get('Temp1');
    const temp2 = formData.get('Temp2');
    const temp3 = formData.get('Temp3');
    const temp4 = formData.get('Temp4');
    const temp5 = formData.get('Temp5');

    // آماده‌سازی داده‌ها برای ایجاد
    const memberLogDataToCreate: any = {
      MemberID: memberIdValue,
      LoginPostID: loginPostIdValue,
      LoginDate: loginDateValue,
      ISActive: isActive ? parseInt(isActive.toString()) : 1 // پیش‌فرض فعال
    };

    // اضافه کردن LogOutDate اگر وجود دارد
    if (logOutDate) {
      const logOutDateValue = new Date(logOutDate.toString());
      if (!isNaN(logOutDateValue.getTime())) {
        memberLogDataToCreate.LogOutDate = logOutDateValue;
      }
    }

    // اضافه کردن فیلدهای temp اگر وجود دارند
    const tempFields = ['Temp1', 'Temp2', 'Temp3', 'Temp4', 'Temp5'];
    for (const tempField of tempFields) {
      const value = formData.get(tempField);
      if (value) {
        memberLogDataToCreate[tempField] = value.toString().trim();
      }
    }

    // ایجاد MemberLog جدید
    const newMemberLog = await prisma.tblvMemberLog.create({
      data: memberLogDataToCreate,
      include: {
        tblvMember: {
          select: {
            UserName: true,
            MemberID: true
          }
        },
        tblvPost: {
          select: {
            PostNameEN: true,
            PostNameFA: true
          }
        }
      }
    });

    // بازگرداندن پاسخ موفق
    return Response.json(
      {
        success: true,
        message: "لاگ کاربر با موفقیت ایجاد شد",
        memberLogId: newMemberLog.MemberLogID,
        data: newMemberLog
      },
      { status: 201 }
    );

  } catch (error) {
    const { message, status } = handlePrismaError(error);
    return Response.json(
      { success: false, error: message },
      { status }
    );
  }
}

// تابع بروزرسانی MemberLog (PUT)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const memberLogId = parseInt(id);

    if (isNaN(memberLogId) || memberLogId <= 0) {
      return Response.json(
        { error: 'شناسه MemberLog معتبر نیست' },
        { status: 400 }
      );
    }

    const formData = await request.formData();
    
    // بررسی وجود MemberLog
    const existingMemberLog = await prisma.tblvMemberLog.findUnique({
      where: { MemberLogID: memberLogId }
    });

    if (!existingMemberLog) {
      return Response.json(
        { error: "لاگ کاربر مورد نظر یافت نشد" },
        { status: 404 }
      );
    }

    // آماده‌سازی داده‌ها برای بروزرسانی
    const updateData: Prisma.tblvMemberLogUpdateInput = {};

    // فیلدهای قابل بروزرسانی
    const updatableFields = [
      'LogOutDate', 'ISActive', 'Temp1', 'Temp2', 'Temp3', 'Temp4', 'Temp5'
    ];

    for (const field of updatableFields) {
      const value = formData.get(field);
      if (value !== null && value !== undefined) {
        if (field === 'ISActive') {
          updateData[field] = parseInt(value.toString());
        } else if (field === 'LogOutDate') {
          const dateValue = new Date(value.toString());
          if (!isNaN(dateValue.getTime())) {
            updateData[field] = dateValue;
          }
        } else {
          updateData[field] = value.toString().trim();
        }
      }
    }

    // اگر MemberID یا LoginPostID ارسال شده، بررسی وجود آنها
    const newMemberId = formData.get('MemberID');
    const newLoginPostId = formData.get('LoginPostID');

    if (newMemberId) {
      const memberIdValue = parseInt(newMemberId.toString());
      
      // بررسی وجود Member جدید
      const memberExists = await prisma.tblvMember.findUnique({
        where: { MemberID: memberIdValue }
      });

      if (!memberExists) {
        return Response.json(
          { error: "کاربر مورد نظر یافت نشد" },
          { status: 404 }
        );
      }

      updateData.MemberID = memberIdValue;
      updateData.tblvMember = { connect: { MemberID: memberIdValue } };
    }

    if (newLoginPostId) {
      const loginPostIdValue = parseInt(newLoginPostId.toString());
      
      // بررسی وجود Post جدید
      const postExists = await prisma.tblvPost.findUnique({
        where: { PostID: loginPostIdValue }
      });

      if (!postExists) {
        return Response.json(
          { error: "پست مورد نظر یافت نشد" },
          { status: 404 }
        );
      }

      updateData.LoginPostID = loginPostIdValue;
      updateData.tblvPost = { connect: { PostID: loginPostIdValue } };
    }

    // اگر LoginDate ارسال شده
    const newLoginDate = formData.get('LoginDate');
    if (newLoginDate) {
      const loginDateValue = new Date(newLoginDate.toString());
      if (!isNaN(loginDateValue.getTime())) {
        updateData.LoginDate = loginDateValue;
      }
    }

    // بروزرسانی MemberLog
    const updatedMemberLog = await prisma.tblvMemberLog.update({
      where: { MemberLogID: memberLogId },
      data: updateData,
      include: {
        tblvMember: {
          select: {
            UserName: true,
            MemberID: true
          }
        },
        tblvPost: {
          select: {
            PostNameEN: true,
            PostNameFA: true
          }
        }
      }
    });

    return Response.json(
      {
        success: true,
        message: "لاگ کاربر با موفقیت بروزرسانی شد",
        data: updatedMemberLog
      },
      { status: 200 }
    );

  } catch (error) {
    const { message, status } = handlePrismaError(error);
    return Response.json(
      { success: false, error: message },
      { status }
    );
  }
}