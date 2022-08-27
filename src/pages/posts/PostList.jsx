import React, { useEffect, useState, useContext } from "react"
import PostViewAll from "../../components/posts/PostViewAll.jsx";
import NameTitle from "../../components/posts/TitleName.jsx";
import { PostContext } from "../../context/PostContext.jsx"
import Pagination from "../../components/pagination/Pagination.jsx"



function PostList() {
    const {posts} = useContext(PostContext);
    const [filtrados, setFiltrados] = useState([])
    const [search , setSearch] = useState("")
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(2);



    function handleChange(e) {
        setSearch(e.target.value)
        filtrar(e.target.value)
    }

    useEffect(()=>{
        if(posts.length > 0){
            setFiltrados(posts)
        }

    }, [posts])


    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filtrados.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const filtrar = (termino) => {
        let resultados =  posts.filter((project) => {
            if (project.titulo.toString().toLowerCase().includes(termino.toLowerCase()) || project.categoria.nombre.toString().toLowerCase().includes(termino.toLowerCase()) || project.creador.nombre.toString().toLowerCase().includes(termino.toLowerCase())) {
                return project
            } 
            return null
        })
        setFiltrados(resultados)
    }   
    

    return (
        <div className="container-md">
            <h1> <NameTitle/> </h1>
            
                <form className="d-flex my-4">
                    <input type="search" id="search" className="form-control me-2" placeholder="Buscar" value={search} onChange={handleChange} />
                </form>
            <PostViewAll posts={currentPosts} />
            <Pagination
                postsPerPage={postsPerPage}
                totalPosts={filtrados.length}
                paginate={paginate}
            />
        </div>
    )
}


export default PostList;