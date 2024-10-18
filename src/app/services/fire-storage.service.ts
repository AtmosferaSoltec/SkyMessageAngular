import { inject, Injectable } from "@angular/core";
import { ref, Storage, uploadBytesResumable, getDownloadURL } from "@angular/fire/storage";

@Injectable({
  providedIn: "root",
})
export class FireStorageService {
  storage = inject(Storage);

  async uploadImage(file: File, tipoEnvio: number): Promise<string> {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;

    let folder = '';
    switch (tipoEnvio) {
      case 2:
        folder = 'Imagenes';
        break;
      case 3:
        folder = 'Documentos';
        break;
      case 4:
        folder = 'Videos';
        break;
      default:
        throw new Error('Tipo de envío no válido');
    }

    const fileExtension = file.name.split(".").pop();

    const filePath = `${folder}/${year}/${month}/${Date.now()}.${
      fileExtension ?? ""
    }`;
    const storageRef = ref(this.storage, filePath);
    const res = await uploadBytesResumable(storageRef, file);
    const url = await getDownloadURL(res.ref);
    return url
  }
}
