import {db} from '../db/db'
import {Photo} from '../models/photo'
import { ObjectId } from 'mongodb'

interface PhotoServices {
    updateLikes (id: string, inc: number): Promise<Photo>
    // createComment (id:string, comment:string ): Promise<Photo>
    createPhoto (photo:Photo): Promise<string>
    getAllPhotos(): Promise<Photo[]>
    
}
const photoCollection = db.collection<Photo>('photos')

export const getAllPhotos = async(): Promise<Photo[]> => {
    const photos = await photoCollection.find().toArray()

        return photos
}

const createPhoto = async (photo: Photo): Promise<string> => {
    try {
        const res= await photoCollection.insertOne(photo)
        return res.insertedId.toString()
    }catch (error) {
        return 'something went wrong'
    }
}

export const updateLikes = async(
    id:string, inc:number = 1): Promise<Photo> => {
    const res = await photoCollection.findOneAndUpdate(
        {_id: new ObjectId(id)},
        { $inc: { likes: inc }}
    )

    const updatePhoto = res.value as Photo
    // updatedPhoto.likes = inc
    return updatePhoto
}

// export const createComment = async(id: string, comment: string): Promise<Photo> => {
//     return null
//}

export const photoServices: PhotoServices = {
    getAllPhotos,
    createPhoto,
    updateLikes,
    // createComment 
}