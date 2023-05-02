// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBgVBGQkersxYtELSQEsotXtyxyXuqN5kQ",
    authDomain: "veterinariahuellita-8d203.firebaseapp.com",
    projectId: "veterinariahuellita-8d203",
    storageBucket: "veterinariahuellita-8d203.appspot.com",
    messagingSenderId: "833441330192",
    appId: "1:833441330192:web:34dd1ff7f2deb73de90695"
  };
  
  // Inicializar Firebase
  firebase.initializeApp(firebaseConfig);

// Obtener el email y el balance del usuario
let email;
let balance;
let usuarioDoc;

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    email = user.email;
    const db = firebase.firestore();
    const usuariosRef = db.collection("usuarios");
    usuarioDoc = usuariosRef.doc(user.uid);

    usuarioDoc.get().then(doc => {
      if (doc.exists) {
        balance = doc.data().balance;
        document.getElementById("email").textContent = email;
        document.getElementById("balance").textContent = balance;
      } else {
        console.log("No se encontró el usuario en la base de datos");
      }
    }).catch(error => {
      console.log("Error al obtener el usuario de la base de datos:", error);
    });
  } else {
    console.log("No se ha iniciado sesión");
  }
});

// Función para cerrar sesión
function cerrarSesion() {
  firebase.auth().signOut().then(() => {
    console.log("Sesión cerrada");
    window.location.replace("login.html");
  }).catch((error) => {
    console.log("Error al cerrar sesión:", error);
  });
}

// Configurar la integración con PayPal
paypal.Buttons({
    // Establecer el entorno de PayPal (sandbox o producción)
    env: 'sandbox',
    // Establecer el ID de cliente de PayPal
    client: {
      sandbox: 'AclcsVUqq1k9tQBq9b1CZpNyuJ-iJmtaPZoWv14skjkZrPCrpc3aa-eI7Kl7se4Id-wTcfJTFkMoEY_1',
      production: 'EPOMWRQOTVgojPoYjl120urMdm8ub_aDN9RMpsRgix8ZxebtFZqM7yjX58PdKrIb767U4Xx6Zp-xrhlS'
    },
    // Crear el pedido al hacer clic en el botón de PayPal
    createOrder: function(data, actions) {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: balance
            }
          }]
        });
      },
      // Confirmar el pedido al hacer clic en el botón de PayPal
      onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
          // Actualizar el balance del usuario en la base de datos
          usuarioDoc.update({ balance: 0 }).then(function() {
            console.log("Balance pagado con éxito");
          }).catch(function(error) {
            console.log("Error al actualizar el balance del usuario:", error);
          });
        });
      }
    }).render('#paypal-button-container');
  

