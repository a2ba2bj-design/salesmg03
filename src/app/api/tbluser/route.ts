import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '../../../generated/prisma/client'
//import { decrypt } from "../../lib/session";
import { makeSerializable } from "../../lib/util";
const prisma = new PrismaClient()
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: number }> },
  ) {
    const id = (await params).id;
    prisma.tbluser.delete({
    where: {
       userID : id, // Replace with the actual ID of the user to delete
  },
})
    return new Response(null, { status: 204 });
  }
  
 export async function GET(request: NextRequest  )
   
  {
   
    const carts =makeSerializable( await prisma.tbluser.findMany())
    return new Response(JSON.stringify(carts)    
    , {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  export async function POST(request: NextRequest) {
    try{
           
           const formData  = await (request.formData());
              const fName  = formData.get('fName');
              const lName  = formData.get('lName');
              const phone  = formData.get('phone');
              const address  = formData.get('address');
              //const birthDate  = formData.get('birthDate');
              //const createdAt  = formData.get('createdAt');
              // const isActive  = formData.get('isActive');
          
      const t=await prisma.tbluser.create({
            data: {
            
              fName :fName.toString(),
              lName: lName.toString(),
              phone :phone.toString(),
              address:address.toString(),
              birthDate:new Date(),
              createdAt:new Date(),
              isActive:false

                                  
            }
          })
            return new Response(JSON.stringify(t.userID), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
          });
        }
        catch(error){
       
          return new Response(error, {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
            
            
          });
        }
        
  }