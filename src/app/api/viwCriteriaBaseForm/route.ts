import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '../../../generated/prisma/client'
import { makeSerializable } from "../../lib/util";
const prisma = new PrismaClient()
export async function POST(request: NextRequest) {
    try{
    const formData  = await (request.formData());
   const master = formData.get("masterid")
    const idList  = formData.getAll("id");
   idList.map(async (item)=>
    await prisma.tblevaluation_baseform_detail.create( {
      data: {
       criteriaID: parseInt(item.toString()),
       evaluation_baseformID:parseInt(master.toString()),
       creatorMemberID:1,
       createDate: new Date()

      }
    }))
     return new Response(JSON.stringify(""), {
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
 export async function GET(request: NextRequest  )
   
  {
   const searchParams = request.nextUrl.searchParams;
   const idin = searchParams.get('id');
  

  const carts =await prisma.$queryRaw`EXEC [dbo].[getallCriteria] ${idin};`;
 //makeSerializable( await prisma.viwAllBaseFormCriteria.findMany(   ))
  return new Response(JSON.stringify(carts)    
    , {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
 
  