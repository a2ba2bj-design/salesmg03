import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '../../../generated/prisma/client'
import { decrypt } from "../../lib/session";
import { makeSerializable } from "../../lib/util";
const prisma = new PrismaClient()
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: number }> },
  ) {
    const id = (await params).id;
    prisma.tblusercode.delete({
  where: {
    userCodeID : id, // Replace with the actual ID of the user to delete
  },
})
    return new Response(null, { status: 204 });
  }
  
 export async function GET(request: NextRequest  )
   
  {
 
    const carts =makeSerializable( await prisma.tblusercode.findMany())
  return new Response(JSON.stringify(carts)    
    , {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
 
  export async function POST(request: NextRequest) {
    try{

          // Parse the request body
          const session = request.cookies.get("session")?.value;
          if (!session) return NextResponse.json({ error: "error"}, { status: 300 });
      
          const parsed = await decrypt(session);
   
        const customerID = parsed.user.phone ;
        const formData  = await (request.formData());
        const modelID  = formData.get('modelID');
     
      const t=await prisma.tblusercode.create({
            data: {
            
              userID  :1,
              userCode:2,
              createdAt:new Date(),
                                               
            }
          })
       
       
          return new Response(JSON.stringify(modelID), {
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