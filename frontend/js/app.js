const API_URL = "http://localhost:3000/usuarios";

// Cargar lista de usuarios
async function cargarUsuarios() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Error al obtener usuarios");
    const users = await response.json();

    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";

    users.forEach(user => {
      const row = `
        <tr>
          <td>${user.id}</td>
          <td>${user.nombre}</td>
          <td>${user.email}</td>
          <td>${user.telefono}</td>
          <td>
            <button class="btn btn-warning btn-sm" onclick="editarUsuario(${user.id})">Editar</button>
            <button class="btn btn-danger btn-sm" onclick="eliminarUsuario(${user.id})">Eliminar</button>
          </td>
        </tr>
      `;
      tableBody.innerHTML += row;
    });
  } catch (error) {
    console.error("Error:", error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudieron cargar los usuarios"
    });
  }
}

// Guardar usuario (crear o actualizar)
document.getElementById("userForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = document.getElementById("id").value;
  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;
  const telefono = document.getElementById("telefono").value;

  const user = { nombre, email, telefono };
  const method = id ? "PUT" : "POST";
  const url = id ? `${API_URL}/${id}` : API_URL;

  try {
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    });

    if (!response.ok) throw new Error("Error en la petición");

    Swal.fire({
      icon: "success",
      title: "Éxito",
      text: "Usuario guardado correctamente"
    }).then(() => window.location.href = "index.html");
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudo guardar el usuario"
    });
  }
});

// Eliminar usuario
async function eliminarUsuario(id) {
  const confirm = await Swal.fire({
    icon: "warning",
    title: "¿Eliminar usuario?",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar"
  });

  if (!confirm.isConfirmed) return;

  try {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error();
    Swal.fire({ icon: "success", title: "Eliminado" });
    cargarUsuarios();
  } catch (error) {
    Swal.fire({ icon: "error", title: "Error al eliminar usuario" });
  }
}

// Editar usuario
async function editarUsuario(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error("Error al obtener usuario");

    const user = await response.json();

    // Guardar datos temporalmente en localStorage para pasarlos a form.html
    localStorage.setItem("usuarioEditar", JSON.stringify(user));

    // Redirigir al formulario
    window.location.href = "form.html";
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudo cargar la información del usuario"
    });
  }
}


document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("tableBody")) {
    cargarUsuarios();
  }

  const btnAdd = document.getElementById("btnAdd");
  if (btnAdd) {
    btnAdd.addEventListener("click", () => {
      window.location.href = "form.html";
    });
  }
});


//  Esto expone la función al ámbito global para que el HTML pueda llamarla
window.cargarUsuarios = cargarUsuarios;
window.editarUsuario = editarUsuario;
window.eliminarUsuario = eliminarUsuario;

