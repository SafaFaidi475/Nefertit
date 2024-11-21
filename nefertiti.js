const admin = require("firebase-admin");

const serviceAccount = require("."C:\Users\Public\Downloads\nefertiti-d9313-01d32cdc5748.json"");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://nefertiti-d9313-default-rtdb.firebaseio.com", 
});


const db = admin.firestore();
class Contenu {
    constructor(idContenu, titre, datePublication, categorie, tags) {
      if (new.target === Contenu) {
        throw new Error("La classe Contenu ne peut pas être instanciée directement.");
      }
  
      this.idContenu = idContenu;
      this.titre = titre;
      this.datePublication = datePublication;
      this.categorie = categorie;
      this.tags = tags || [];
    }
  
    afficherDetails() {
      throw new Error("La méthode afficherDetails() doit être implémentée.");
    }
  

    ajouterFavoris() {
      console.log(`Le contenu "${this.titre}" a été ajouté aux favoris.`);
    }
  }
  class Article extends Contenu {
    constructor(idContenu, titre, datePublication, categorie, tags, auteur) {
      super(idContenu, titre, datePublication, categorie, tags);
      this.auteur = auteur;
    }

    afficherDetails() {
      console.log(`Article: ${this.titre} (${this.datePublication})`);
      console.log(`Auteur: ${this.auteur}`);
      console.log(`Catégorie: ${this.categorie}`);
      console.log(`Tags: ${this.tags.join(", ")}`);
    }
  }
  async function creerUtilisateur(idUtilisateur, nom, email) {
    try {
      await setDoc(doc(db, "utilisateurs", idUtilisateur), {
        nom: nom,
        email: email
      });
      console.log("Utilisateur créé avec succès !");
    } catch (e) {
      console.error("Erreur lors de la création de l'utilisateur: ", e);
    }
  }
  async function creerDiscussion(idDiscussion, titre, contenu, auteurId) {
    try {
      
      await setDoc(doc(db, "discussions", idDiscussion), {
        titre: titre,
        contenu: contenu,
        auteur: doc(db, "utilisateurs", auteurId), 
        dateCreation: new Date()
      });
      console.log("Discussion créée avec succès !");
    } catch (e) {
      console.error("Erreur lors de la création de la discussion: ", e);
    }
  }
  
  async function ajouterCommentaire(idDiscussion, idCommentaire, contenuCommentaire, auteurId) {
    try {
     
      await setDoc(doc(db, "comments", idCommentaire), {
        contenu: contenuCommentaire,
        auteur: doc(db, "utilisateurs", auteurId), 
        discussion: doc(db, "discussions", idDiscussion), 
        datePublication: new Date()
      });
      console.log("Commentaire ajouté avec succès !");
    } catch (e) {
      console.error("Erreur lors de l'ajout du commentaire: ", e);
    }
  }
  
  async function ajouterContenu(idContenu, titre, categorieId, auteurId) {
    try {
      
      await setDoc(doc(db, "contents", idContenu), {
        titre: titre,
        datePublication: new Date(),
        categorie: doc(db, "categories", categorieId), 
        auteur: doc(db, "utilisateurs", auteurId),
        tags: []
      });
      console.log("Contenu ajouté avec succès !");
    } catch (e) {
      console.error("Erreur lors de l'ajout du contenu: ", e);
    }
  }
  async function supprimerCommentaire(idCommentaire) {
    try {
      await deleteDoc(doc(db, "comments", idCommentaire));
      console.log("Commentaire supprimé avec succès !");
    } catch (e) {
      console.error("Erreur lors de la suppression du commentaire: ", e);
    }
  }
  
  async function supprimerDiscussion(idDiscussion) {
    try {
      await deleteDoc(doc(db, "discussions", idDiscussion));
      console.log("Discussion supprimée avec succès !");
    } catch (e) {
      console.error("Erreur lors de la suppression de la discussion: ", e);
    }
  }
  