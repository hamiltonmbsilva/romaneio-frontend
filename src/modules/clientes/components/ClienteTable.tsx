export default function ClienteTable({clientes,onEdit,onDelete}:any){

 return(

  <table border={1} cellPadding={10} style={{width:"100%"}}>

   <thead>
    <tr>
     <th>Nome</th>
     <th>Cidade</th>
     <th>Telefone</th>
     <th>Status</th>
     <th>Ações</th>
    </tr>
   </thead>

   <tbody>

    {clientes.map((c:any)=>(
     <tr key={c.id}>

      <td>{c.nomeFantasia}</td>
      <td>{c.cidade}</td>
      <td>{c.telefone}</td>

      <td>
       {c.ativo ? "Ativo":"Inativo"}
      </td>

      <td>

       <button onClick={()=>onEdit(c)}>
        Editar
       </button>

       <button onClick={()=>onDelete(c.id)}>
        Deletar
       </button>

      </td>

     </tr>
    ))}

   </tbody>

  </table>

 )
}