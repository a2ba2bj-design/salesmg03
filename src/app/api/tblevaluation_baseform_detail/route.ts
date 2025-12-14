import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '../../../generated/prisma/client'
import { makeSerializable } from "../../lib/util";

const prisma = new PrismaClient()
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: number }> },
  ) {
    const id = (await params).id;
    prisma.tblevaluation_baseform_detail.delete({
  where: {
    id: id, // Replace with the actual ID of the user to delete
  },
})
    return new Response(null, { status: 204 });
  }
  
 export async function GET(request: NextRequest  )
   
  {
     const formData  = await (request.formData());
                const id  = formData.get('id');
                const carts =makeSerializable( await prisma.tblevaluation_baseform_detail.findMany(
          {
            where:{
                  evaluation_baseformID:parseInt(id.toString())
          },
          }
                ))
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
            const evaluation_baseformID   = formData.get('evaluation_baseformID ');
            const criteriaID   = formData.get('criteriaID '); 
            const creatorMemberID   = formData.get('creatorMemberID '); 
            const createDate   = formData.get('createDate ');
     
      const t=await prisma.tblevaluation_baseform_detail.create({
            data: {
            
              evaluation_baseformID:parseInt(evaluation_baseformID.toString()),
              criteriaID :parseInt(criteriaID.toString()),
              creatorMemberID:parseInt(creatorMemberID.toString()),
              createDate:new Date()

              
              
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