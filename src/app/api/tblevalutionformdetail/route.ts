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
    prisma.tblevalutionformdetail.delete({
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
    const carts =makeSerializable( await prisma.tblevalutionformdetail.findMany())
  return new Response(JSON.stringify(carts)    
    , {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  const getModel = async (id ) => {   
       const feed = await prisma.tblevalutionformdetail.findFirst({  where:
        { 
          AND:
          [
          {id:parseInt(id)},
         
          ]
        },}
      
      )
      return (  makeSerializable(feed) )
      
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
        const model = await getModel(modelID.toString())
     // console.log(customerID+" "+model.modelID+" "+model.price)
      const t=await prisma.tblevalutionformdetail.create({
            data: {
            
              evaluationFormID   : 1,
              criteriaID :1,
               factor:1,
                       
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