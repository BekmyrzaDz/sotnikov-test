import {Route, Routes} from "react-router-dom";
import {PhotosPage, PostsPage, TodosPage, Page404} from "./Pages";
import {Header} from "./components";
import {Container} from '@mui/material'

function App() {
  return (
    <>
      <Header/>
      <Container maxWidth={`xl`}>
        <Routes>
          <Route path={`/`} element={<PostsPage/>}/>
          <Route path={`/posts`} element={<PostsPage/>}/>
          <Route path={`/albums`} element={<PhotosPage/>}/>
          <Route path={`/todos`} element={<TodosPage/>}/>
          <Route path={`*`} element={<Page404/>}/>
        </Routes>
      </Container>
    </>
  )
}

export default App
