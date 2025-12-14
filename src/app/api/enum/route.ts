import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '../../../generated/prisma/client'
//import { decrypt } from "../../lib/session";
import { makeSerializable } from "../../lib/util";
//import { join } from 'path'

const prisma = new PrismaClient()

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: number }> },
  ) {
    const id = (await params).id;
    prisma.tblenum.delete({
  where: {
    id: id, // Replace with the actual ID of the user to delete
  },
})
    return new Response(null, { status: 204 });
  }

  
 export async function GET(request: NextRequest  )
   
  {
    const searchParams = request.nextUrl.searchParams;
    const groupname = searchParams.get('groupname');
    let cats;
    if (!groupname){
 cats =makeSerializable( await prisma.tblenum.findMany( {
           
          }))
    }
    else{
       cats =makeSerializable( await prisma.tblenum.findMany( {
            where:{
                  groupname:groupname.toString()
          },
          }))}
       return new Response(JSON.stringify(cats)    
    , {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
 
  export async function POST(request: NextRequest) {
    try{

        const formData  = await (request.formData());
        const groupname  = formData.get('groupname');
        const name  = formData.get('name');
     // console.log(customerID+" "+model.modelID+" "+model.price)
      const t=await prisma.tblenum.create({
            data: {
            
              groupname:groupname.toString(),
              name:name.toString(),
             
            
            
             
        
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