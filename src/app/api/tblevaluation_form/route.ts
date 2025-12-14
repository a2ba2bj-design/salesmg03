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
    prisma.tblevaluation_form.delete({
  where: {
    id: id, // Replace with the actual ID of the user to delete
  },
})
    return new Response(null, { status: 204 });
  }
  
 export async function GET(request: NextRequest  )
   
  {
   const carts =makeSerializable( await prisma.tblevaluation_form.findMany(
     {include:{tblevaluated:true,tblevaluator:true,tblmanager:true,tblevaluation_baseform:true}}


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
             const evaluatorID  = formData.get('evaluatorID');
             const evaluatedID  = formData.get('evaluatedID');
             const baseFormID  = formData.get('baseFormID');
             const managerID  = formData.get('managerID');
             const name  = formData.get('name');
         //    const evaluatedSignature = formData.get('evaluatedSignature');
           //    const evaluatorSignature = formData.get('evaluatorSignature');
          //   const creatorMemberID  = formData.get('creatorMemberID');
           // const createdate  = formData.get('createdate');
      const t=await prisma.tblevaluation_form.create({
            data: {
              evaluatorID  :parseInt(evaluatorID.toString()),
              evaluatedID :parseInt(evaluatedID.toString()),
              baseFormID :parseInt(baseFormID.toString()),
              managerID:parseInt(managerID.toString()),
              name:name.toString(),
         //     evaluatorSignature:evaluatorSignature.toString(),
          //    evaluatorSignatureDate:new Date(),
           //   evaluatedSignature:evaluatedSignature.toString(),
            //  evaluatedSignatureDate:new Date(),
              creatorMemberID:1,
              createdate:new Date()
           
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