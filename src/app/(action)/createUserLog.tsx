'use server'
import { login } from '../lib/session'
import { redirect } from 'next/navigation'
import { PrismaClient } from '../../generated/prisma/client'
 const prisma = new PrismaClient()
export async function createUserLog(userID:number,opt:number,entrytypeid:number) {
  try {
   let usercode= await prisma.tblusercode.findFirst({  
    where: {  AND:
      [
        {userID: userID},
        {userCode: opt},
        { createdAt: {gte:new Date(Date.now() - (25 * 60 * 1000))}}
      ]
    },
  orderBy: {
      userCodeID: 'desc',
  },
 // take: 1,
 })
     if (usercode==null )
        return { 
            success: false,
            message: 'رمز وارد شده صحیح نمی باشد دوباره تلاش کنید'
         
          }
 else{
   await login(usercode.userID,entrytypeid)
   return { 
      success: true,
      message: usercode.userCode
   
    }
  }
  } catch (error) {
      return { 
      success: false, 
      message: 'خطای کد یکبار مصرف' 
    }
  }
 finally{
 
  //  redirect('/')
    
 }
}
