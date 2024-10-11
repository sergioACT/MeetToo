import { collection, getDoc, getFirestore, setDoc, doc, getDocs, onSnapshot, query, where, updateDoc, deleteDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';

export class Connection {
    user_response?: object;
    firestore;
    constructor() {
        const firebaseApp = initializeApp(environment.firebase);
        this.firestore = getFirestore(firebaseApp);
    }

    async setDoc(collection: string, id: string, document: object) {
        await setDoc(doc(this.firestore, collection, id), document);
    }
    async getDoc(collection: string, id: string) {
        var doc_ref = doc(this.firestore, collection, id);
        var document = await getDoc(doc_ref);
        var data = null;
        if (document.exists()) {
            data = document.data();
        }
        return data;
    }
    async getDocs(coleccion: string, ids: String[]) {
        try {
            const promesas = ids.map(id => {
                const doc_ref = doc(this.firestore, coleccion, id.toString());
                return getDoc(doc_ref);
            });

            const documents = await Promise.all(promesas);

            const documentos = documents
                .filter(docSnapshot => docSnapshot.exists())
                .map(docSnapshot => docSnapshot.data());

            return documentos;
        } catch (error) {
            console.error("Error al obtener los documentos:", error);
            return [];
        }
    }
    async getDocsByIds(_collection: string, filters: { [key: string]: any }) {
        try {
            let q = query(
                collection(this.firestore, _collection),
            );

            for (const [key, value] of Object.entries(filters)) {
                q = query(q, where(key, "==", value));
            }
            const docs_ref = await getDocs(q);
            const documents = docs_ref.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            return documents;
        } catch (error) {
            console.error("Error al obtener los documentos:", error);
            return [];
        }
    }
    async updateDoc(collection: string, id: string, newData: any) {
        const docRef = doc(this.firestore, collection, id);
        try {
            await updateDoc(docRef, newData);
            console.log("Document updated successfully");
        } catch (e) {
            console.error("Error updating document: ", e);
        }
    }
    async deleteDoc(collection: string,id: string) {
        try {
          const docRef = doc(this.firestore, collection, id);
          await deleteDoc(docRef);
          console.log('Document successfully deleted!');
        } catch (error) {
          console.error('Error removing document: ', error);
        }
      }
    
}


