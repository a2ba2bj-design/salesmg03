'use server'
import { writeFile } from 'fs/promises'
import { join } from 'path'
import { PrismaClient } from '../../generated/prisma/client'
const prisma = new PrismaClient()
export async function uploadImage(formData: FormData) {
 const aDimageSrc = formData.get('aDimageSrc') as File
 const imageSrc = formData.get('imageSrc') as File
   if (!aDimageSrc || aDimageSrc.size === 0) {
    return { success: false, message: 'No file uploaded' }
  }
  // Generate a unique filename
  const timestamp = Date.now()
  const filenameAD = `${timestamp}_${aDimageSrc.name}`
  const filenameMix = `${timestamp}_${imageSrc.name}`
  const pathAD = join(process.cwd(), 'public', 'uploads/adImage', filenameAD)
  const pathMix = join(process.cwd(), 'public', 'uploads/mixImage', filenameMix)
  try {
   // Ensure uploads directory exists
    await import('fs').then(fs => 
      fs.promises.mkdir(join(process.cwd(), 'public', 'uploads/adImage'), { recursive: true })
    )
    await import('fs').then(fs => 
      fs.promises.mkdir(join(process.cwd(), 'public', 'uploads/mixImage'), { recursive: true })
    )
    // Convert File to Buffer
    const bytes = await aDimageSrc.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(pathAD, buffer)
    const bytesmix = await imageSrc.arrayBuffer()
    const buffermix = Buffer.from(bytesmix)
    await writeFile(pathMix, buffermix)
   return { 
      success: true, 
      message: 'File uploaded successfully',
      path: `/uploads/adImage${filenameAD}`

    }
  } catch (error) {
    console.error('Upload error:'+error, error)
    return { 
      success: false, 
      message: 'Failed to upload file' ,
     
    }
  }
}
