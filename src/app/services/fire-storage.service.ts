import { inject, Injectable } from "@angular/core";
import { ref, Storage, uploadBytesResumable, getDownloadURL } from "@angular/fire/storage";

@Injectable({
  providedIn: "root",
})
export class FireStorageService {
  storage = inject(Storage);

  async uploadImage(file: File): Promise<string> {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;

    const fileExtension = file.name.split(".").pop();

    const filePath = `Fotos/${year}/${month}/${Date.now()}.${
      fileExtension ?? ""
    }`;
    const storageRef = ref(this.storage, filePath);
    const res = await uploadBytesResumable(storageRef, file);
    const url = await getDownloadURL(res.ref);
    return url
  }
}
