import { useState, useEffect } from "react";
const STORAGE_KEY = 'listado'

function SelectorFecha({ value, onChange }) {
    return (
        <div className="input-group">
            <span className="input-group-text bg-danger text-white">📅</span>
            <input
                type="date"
                className="form-control border-danger"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    )
}

function Formulario() {
    const [items, setItems] = useState(() => JSON.parse(localStorage.getItem(STORAGE_KEY)) || []);

    const [codigo, setCodigo] = useState('')
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [tipoActivo, setTipoActivo] = useState('Hardware')
    const [direccionIp, setDireccionIp] = useState('')
    const [ubicacion, setUbicacion] = useState('Física')
    const [propietario, setPropietario] = useState('')
    const [confidencialidad, setConfidencialidad] = useState('Media')
    const [integridad, setIntegridad] = useState('Media')
    const [disponibilidad, setDisponibilidad] = useState('Media')
    const [clasificacion, setClasificacion] = useState('Interna')
    const [fechaParchado, setFechaParchado] = useState('')
    const [estado, setEstado] = useState('Activo')
    const [responsable, setResponsable] = useState('')

    const [mensaje, setMensaje] = useState(null)

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }, [items]);

    function limpiarCampos() {
        setCodigo('');
        setNombre('');
        setDescripcion('');
        setTipoActivo('Hardware');
        setDireccionIp('');
        setUbicacion('Física');
        setPropietario('');
        setConfidencialidad('Media');
        setIntegridad('Media');
        setDisponibilidad('Media');
        setClasificacion('Interna');
        setFechaParchado('');
        setEstado('Activo');
        setResponsable('');
    }

    function eliminarItem(index) {
        setItems(items.filter((_, i) => i !== index));
    }

    function agregarItem() {
        const camposFaltantes = []
        if (codigo.trim() === '') camposFaltantes.push('Código')
        if (nombre.trim() === '') camposFaltantes.push('Nombre del Activo')
        if (descripcion.trim() === '') camposFaltantes.push('Descripción')
        if (propietario.trim() === '') camposFaltantes.push('Propietario')
        if (responsable.trim() === '') camposFaltantes.push('Responsable')

        if (camposFaltantes.length > 0) {
            const listado = camposFaltantes.join(', ')
            const plural = camposFaltantes.length > 1
            setMensaje({
                tipo: 'error',
                texto: `No se pudo agregar el ítem: falta${plural ? 'n' : ''} completar ${plural ? 'los campos' : 'el campo'} obligatorio${plural ? 's' : ''}: ${listado}.`
            })
            return
        }

        if (items.some(i => i.codigo === codigo.trim())) {
            setMensaje({ tipo: 'error', texto: `Ya existe un activo con el código "${codigo}".` })
            return
        }

        const objeto = {
            codigo: codigo,
            nombre: nombre,
            descripcion: descripcion,
            tipoActivo: tipoActivo,
            direccionIp: direccionIp,
            ubicacion: ubicacion,
            propietario: propietario,
            confidencialidad: confidencialidad,
            integridad: integridad,
            disponibilidad: disponibilidad,
            clasificacion: clasificacion,
            fechaParchado: fechaParchado,
            estado: estado,
            responsable: responsable
        }

        setItems([...items, objeto]);
        setMensaje({ tipo: 'exito', texto: `Ítem "${nombre}" (Código: ${codigo}) agregado correctamente al inventario.` })
        limpiarCampos();
    }

    return (
        <>
            <h1 className="text-danger fw-bold fst-italic">Inventario de Activos</h1>
            <hr />

            <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Código</label>
                <div className="col-sm-10">
                    <input className="form-control" type="text" value={codigo}
                        onChange={(e) => setCodigo(e.target.value)} placeholder="Identificador único compuesto letras y números" />
                </div>
            </div>

            <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Nombre del Activo</label>
                <div className="col-sm-10">
                    <input className="form-control" type="text" value={nombre}
                        onChange={(e) => setNombre(e.target.value)} placeholder="Nombre descriptivo" />
                </div>
            </div>

            <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Descripción</label>
                <div className="col-sm-10">
                    <textarea className="form-control" value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)} placeholder="De que trata, tecnología, versiones de tecnología" rows="3"></textarea>
                </div>
            </div>

            <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Tipo de Activo</label>
                <div className="col-sm-10">
                    <select className="form-select" value={tipoActivo} onChange={(e) => setTipoActivo(e.target.value)}>
                        <option value="Hardware">Hardware</option>
                        <option value="Software">Software</option>
                        <option value="Información / Datos">Información / Datos</option>
                        <option value="Servicios">Servicios</option>
                    </select>
                </div>
            </div>

            <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Dirección IP</label>
                <div className="col-sm-10">
                    <input className="form-control" type="text" value={direccionIp}
                        onChange={(e) => setDireccionIp(e.target.value)} placeholder="Ej: 192.168.1.10 (opcional)" />
                </div>
            </div>

            <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Ubicación</label>
                <div className="col-sm-10">
                    <select className="form-select" value={ubicacion} onChange={(e) => setUbicacion(e.target.value)}>
                        <option value="Física">Física (servidor, rack, máquina)</option>
                        <option value="Lógica">Lógica (máquina virtual, nube)</option>
                    </select>
                </div>
            </div>

            <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Propietario</label>
                <div className="col-sm-10">
                    <input className="form-control" type="text" value={propietario}
                        onChange={(e) => setPropietario(e.target.value)} placeholder='Área o persona que "posee" el activo' />
                </div>
            </div>

            <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Confidencialidad Requerida</label>
                <div className="col-sm-10">
                    <select className="form-select" value={confidencialidad} onChange={(e) => setConfidencialidad(e.target.value)}>
                        <option value="Alta">Alta</option>
                        <option value="Media">Media</option>
                        <option value="Baja">Baja</option>
                    </select>
                </div>
            </div>

            <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Integridad Requerida</label>
                <div className="col-sm-10">
                    <select className="form-select" value={integridad} onChange={(e) => setIntegridad(e.target.value)}>
                        <option value="Alta">Alta</option>
                        <option value="Media">Media</option>
                        <option value="Baja">Baja</option>
                    </select>
                </div>
            </div>

            <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Disponibilidad Requerida</label>
                <div className="col-sm-10">
                    <select className="form-select" value={disponibilidad} onChange={(e) => setDisponibilidad(e.target.value)}>
                        <option value="Alta">Alta</option>
                        <option value="Media">Media</option>
                        <option value="Baja">Baja</option>
                    </select>
                </div>
            </div>

            <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Clasificación Información</label>
                <div className="col-sm-10">
                    <select className="form-select" value={clasificacion} onChange={(e) => setClasificacion(e.target.value)}>
                        <option value="Interna">Interna</option>
                        <option value="Pública">Pública</option>
                        <option value="Confidencial">Confidencial</option>
                    </select>
                </div>
            </div>

            <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Fecha Actualización Parchado</label>
                <div className="col-sm-10 col-md-4">
                    <SelectorFecha value={fechaParchado} onChange={setFechaParchado} />
                </div>
            </div>

            <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Estado</label>
                <div className="col-sm-10">
                    <select className="form-select" value={estado} onChange={(e) => setEstado(e.target.value)}>
                        <option value="Activo">Activo</option>
                        <option value="Obsoleto">Obsoleto</option>
                        <option value="Bajo Revisión">Bajo Revisión</option>
                        <option value="Mantenimiento">Mantenimiento</option>
                    </select>
                </div>
            </div>

            <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Responsable</label>
                <div className="col-sm-10">
                    <input className="form-control" type="text" value={responsable}
                        onChange={(e) => setResponsable(e.target.value)} placeholder="Persona o rol encargado del uso/seguridad" />
                </div>
            </div>

            <button className="btn btn-danger mt-3" onClick={agregarItem}>Agregar Item</button>

            {mensaje && (
                <p
                    className="mt-2 mb-0"
                    style={{ color: mensaje.tipo === 'error' ? '#dc3545' : '#6c757d' }}
                    role={mensaje.tipo === 'error' ? 'alert' : 'status'}
                >
                    {mensaje.texto}
                </p>
            )}

            <br />
            <h4 className="mt-3">Listado de Activos</h4>
            <div className="table-responsive">
                <table className="table table-bordered table-hover">
                    <thead className="table-danger">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Código</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Descripción</th>
                            <th scope="col">Tipo</th>
                            <th scope="col">Dirección IP</th>
                            <th scope="col">Ubicación</th>
                            <th scope="col">Propietario</th>
                            <th scope="col">Confidencialidad</th>
                            <th scope="col">Integridad</th>
                            <th scope="col">Disponibilidad</th>
                            <th scope="col">Clasificación</th>
                            <th scope="col">Fecha Parchado</th>
                            <th scope="col">Estado</th>
                            <th scope="col">Responsable</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.codigo}</td>
                                <td>{item.nombre}</td>
                                <td>{item.descripcion}</td>
                                <td>{item.tipoActivo}</td>
                                <td>{item.direccionIp}</td>
                                <td>{item.ubicacion}</td>
                                <td>{item.propietario}</td>
                                <td>{item.confidencialidad}</td>
                                <td>{item.integridad}</td>
                                <td>{item.disponibilidad}</td>
                                <td>{item.clasificacion}</td>
                                <td>{item.fechaParchado}</td>
                                <td>{item.estado}</td>
                                <td>{item.responsable}</td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() => eliminarItem(index)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
export default Formulario;
