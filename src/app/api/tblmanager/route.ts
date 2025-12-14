import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '../../../generated/prisma/client'
//import { decrypt } from "../../lib/session";
import { makeSerializable } from "../../lib/util";
const prisma = new PrismaClient()
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: number }> },
  ) {
    const id = (await params).id;
    prisma.tblmanager.delete({
  where: {
    id: id, // Replace with the actual ID of the user to delete
  },
})
    return new Response(null, { status: 204 });
  }
  
 export async function GET(request: NextRequest  )
   
  {
   
    const carts =makeSerializable( await prisma.tblmanager.findMany())
    return new Response(JSON.stringify(carts)    
    , {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  export async function POST(request: NextRequest) {
    try{

      
        const formData  = await (request.formData());
              const name  = formData.get('name');
              const lname  = formData.get('lname');
              const mobile  = formData.get('mobile');
              const nationalCode  = formData.get('nationalCode');
      
        const t=await prisma.tblmanager.create({
            data: {
            
               name:name.toString() ,
               lname:lname.toString(),
               mobile:mobile.toString(),
               nationalCode:nationalCode.toString()
  
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