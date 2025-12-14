'use server'
import { writeFile } from 'fs/promises'
import { join } from 'path'
import { PrismaClient } from '../../generated/prisma/client'
const prisma = new PrismaClient()
export async function uploadMultiImage(formData: FormData) {
 const imageSrc = formData.get('imageSrc') as File
 const ModelID = formData.get('ModelID')
  const timestamp = Date.now()
  const filenameMix = `${timestamp}_${ModelID}_${imageSrc.name}`
  const pathMix = join(process.cwd(), 'public', 'uploads/multiImage', filenameMix)
  try {
   // Ensure uploads directory exists
    await import('fs').then(fs => 
      fs.promises.mkdir(join(process.cwd(), 'public', 'uploads/multiImage'), { recursive: true })
    )
    // Convert File to Buffer mix
    const bytesmix = await imageSrc.arrayBuffer()
     const buffermix = Buffer.from(bytesmix)

    // Write file to public/uploads/mix
    await writeFile(pathMix, buffermix)
   
    // Save path to database
   
    return { 
      success: true, 
      message: 'File uploaded successfully',
   

    }
  } catch (error) {
    console.error('Upload error:'+error, error)
    return { 
      success: false, 
      message: 'Failed to upload file' ,
     
    }
  }
}
