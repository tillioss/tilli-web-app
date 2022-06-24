import DataTable from 'react-data-table-component';



export default (props)=>{

    return( <DataTable
        title=""
        columns={props.columns}
        data={props.data}
        
    />)
}