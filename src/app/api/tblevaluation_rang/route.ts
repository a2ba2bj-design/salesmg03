import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '../../../generated/prisma/client'
import { decrypt } from "../../lib/session";
import { makeSerializable } from "../../lib/util";
const prisma = new PrismaClient()
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: number }> },
  ) {
     const formData  = await (request.formData());
   
    const idList  = formData.getAll("id");
   idList.map(async (item)=>await prisma.tblevaluation_rang.delete( {
      where: {
       id: parseInt(item.toString())
      }
    }))
    return new Response(null, { status: 204 });
  }
  
 export async function GET(request: NextRequest  )
   
  {
     const searchParams = request.nextUrl.searchParams;
   const idin = searchParams.get('id');
  
      const carts =makeSerializable( await prisma.tblevaluation_rang.findMany(
        {
          where:{
                  packID:parseInt(idin.toString())
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
          const packID   = formData.get('packID');
          const value    = formData.get('value');
            console.log("gffffff"+packID)
     
      const t=await prisma.tblevaluation_rang.create({
            data: {
            
              packID:parseInt(packID.toString()),
              value:value.toString(),
              
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