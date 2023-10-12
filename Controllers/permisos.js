const Rol = require('../Models/roles'); // Importa el modelo de roles
const RolPermiso = require('../Models/rol_permiso'); // Importa el modelo de asignación de permisos a roles

exports.createRole = async (req, res) => {
  try {
    const { nombreRol, Descripcion, permisos } = req.body; // Obtiene el nombre del rol, descripción y los permisos asignados desde el cuerpo de la solicitud

    // Crea un nuevo rol en la base de datos
    const newRole = await Rol.create({
      nombreRol,
      Descripcion,
    });

    // Asigna los permisos al nuevo rol
    if (permisos && permisos.length > 0) {
      // Itera a través de los permisos y crea asignaciones en la tabla Rol_Permiso
      for (const permisoId of permisos) {
        await RolPermiso.create({
          idRol: newRole.idRol, // El ID del rol recién creado
          idPermiso: permisoId, // El ID del permiso seleccionado
        });
      }
    }

    res.json({ message: 'Rol creado con permisos asignados exitosamente', newRole });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el rol con permisos', message: error.message });
  }
};
