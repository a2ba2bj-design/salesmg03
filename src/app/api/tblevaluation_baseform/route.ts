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
    prisma.tblevaluation_baseform.delete({
  where: {
    id: id, // Replace with the actual ID of the user to delete
  },
})
    return new Response(null, { status: 204 });
  }
  
 export async function GET(request: NextRequest  )
   
  {
      const carts =makeSerializable( await prisma.tblevaluation_baseform.findMany({include:{tblevaluation_rang_pack:true}}))
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
           const rangePackID   = formData.get('rangePackID');
    
     
      const t=await prisma.tblevaluation_baseform.create({
            data: {
               name:name.toString() ,
               rangePackID:parseInt(rangePackID .toString()) ,
               creatorMemberID :1,
                createDate:new Date()
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