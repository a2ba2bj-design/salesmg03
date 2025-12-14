import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '../../../generated/prisma/client'
import { writeFile } from 'fs/promises'
import { join } from 'path'
import { makeSerializable } from "../../lib/util";

const prisma = new PrismaClient()
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: number }> },
  ) {
    const id = (await params).id;
    prisma.tblevaluated.delete({
  where: {
    id: id, // Replace with the actual ID of the user to delete
  },
})
    return new Response(null, { status: 204 });
  }
  
 export async function GET(request: NextRequest  )
   
  {
       const carts =makeSerializable( await prisma.tblevaluated.findMany({include:{tblresponsible:true}}))
       return new Response(JSON.stringify(carts)    
    , {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
    export async function POST(request: NextRequest) {
    try{

          const formData  = await (request.formData());
           const signature  = formData.get('signature')as File;
   if (!signature || signature.size === 0) {
    return { success: false, message: 'No file uploaded' }
  }
  // Generate a unique filename
   const timestamp = Date.now()
  const filename = `${timestamp}_${signature.name}`
  const signaturePath = join(process.cwd(), 'public', 'uploads/signatures', filename)
   // Ensure uploads directory exists
   await import('fs').then(fs => 
      fs.promises.mkdir(join(process.cwd(), 'public', 'uploads/signatures'), { recursive: true })
    )
    // Convert File to Buffer
    const bytes = await signature.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    await writeFile(signaturePath, buffer)

    const name  = formData.get('name');
    const Lname = formData.get('lname');
    const code  = formData.get('code');
    const responsibleID  = formData.get('responsibleID');
    const provinceID  = formData.get('provinceID');
    const cityID  = formData.get('cityID');
    const vilageID  = formData.get('vilageID');
    const manageID  = formData.get('manageID');
    const address  = formData.get('address');
    const phone  = formData.get('phone');
          
    
       const t=await prisma.tblevaluated.create({
            data: {
            
              name:name.toString(),
              Lname:Lname.toString(),
              code:code .toString(),
              responsibleID:parseInt(responsibleID.toString()),
              manageID :parseInt(manageID.toString()),
              provinceID:parseInt(provinceID.toString()),
              cityID:parseInt(cityID.toString()) ,
              vilageID:parseInt(vilageID.toString()),
              address:address.toString(),
              phone:phone.toString(),
              signature:signaturePath.toString()

            }
          })
       
       
          return new Response(JSON.stringify(t.id), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
          });
        }
        catch(error){
       console.log(error)
          return new Response(error, {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
            
            
          });
        }
        
  }