import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '../../../generated/prisma/client'
import { decrypt } from "../../lib/session";
import { makeSerializable } from "../../lib/util";
const prisma = new PrismaClient()
export async function DELETE(request: NextRequest) {
    const formData  = await (request.formData());
   
    const idList  = formData.getAll("id");
   idList.map(async (item)=>await prisma.tblcriteria.delete( {
      where: {
       id: parseInt(item.toString())
      }
    }))
 /* await  prisma.tblcriteria.delete( {
      where: {
        id: 1,
      }
    })*/
    //idList.map((item)=>console.log(item))
    // e.g. Delete user with ID `id` in DB
    return new Response(null, { status: 204 });
  }
  
 export async function GET(request: NextRequest  )
   
  {
  const carts =makeSerializable( await prisma.tblcriteria.findMany({include:{tblcat:true,tbllawref:true}}))
  return new Response(JSON.stringify(carts)    
    , {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  export async function POST(request: NextRequest) {
    try{

       
        const formData  = await (request.formData());
       //console.log(formData)
            const criteriaName  = formData.get('criteriaName');
            const lawRefID  = formData.get('lawRefID');
            const catID  = formData.get('catID');
            const factor  = formData.get('factor');
            const t=await prisma.tblcriteria.create({
            data: {
              criteriaName:criteriaName.toString(),
              lawRefID:parseInt(lawRefID.toString()),
              catID:parseInt(catID.toString()),
              factor:parseFloat(factor.toString()),
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