import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '../../../generated/prisma/client'
import { decrypt } from "../../lib/session";
import { makeSerializable } from "../../lib/util";
const prisma = new PrismaClient()
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
  ) {
    const id = (await params).id;
    // e.g. Delete user with ID `id` in DB
    return new Response(null, { status: 204 });
  }
  
 export async function GET(request: NextRequest  )
   
  {
  const carts =makeSerializable(
     await prisma.tblcat.findMany(  ))
  return new Response(JSON.stringify(carts)    
    , {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
 
      
    
  export async function POST(request: NextRequest) {
    try{

     
        const formData  = await (request.formData());
        const catName  = formData.get('catName');
     // console.log(customerID+" "+model.modelID+" "+model.price)
      const t=await prisma.tblcat.create({
            data: {
            
              catName:catName.toString()
            
            
             
        
            }
          })
       
       
          return new Response(JSON.stringify(catName), {
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