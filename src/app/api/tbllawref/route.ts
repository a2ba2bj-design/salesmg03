import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '../../../generated/prisma/client'
import { makeSerializable } from "../../lib/util";
const prisma = new PrismaClient()
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: number }> },
  ) {
    const id = (await params).id;
    prisma.tbllawref.delete({
  where: {
    id: id, // Replace with the actual ID of the user to delete
  },
})
    return new Response(null, { status: 204 });
  }
  
 export async function GET(request: NextRequest  )
   
  {
   /* const session = request.cookies.get("session")?.value;
    if (!session) return null;
    
    const parsed = await decrypt(session);*/
    const carts =makeSerializable( await prisma.tbllawref.findMany())
  return new Response(JSON.stringify(carts)    
    , {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  export async function POST(request: NextRequest) {
    try{

          // Parse the request body
         
        const formData  = await (request.formData());
        const name  = formData.get('name');
     
     // console.log(customerID+" "+model.modelID+" "+model.price)
      const t=await prisma.tbllawref.create({
            data: {
            
              refName : name.toString(),
              
                       
            }
          })
       
       
          return new Response(JSON.stringify(t.id), {
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