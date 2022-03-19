import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import DeleteOutlined from '@mui/icons-material/DeleteOutlined'
import Edit from '@mui/icons-material/Edit'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import './index.css';

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      todos: [
        {
          id: Math.floor(Math.random() * 100000),
          title: "Kegiatan Hari Sabtu",
          todo: "Mengerjakan PR",
          status: false
        },
        {
          id: Math.floor(Math.random() * 100000),
          title: "Kegiatan Hari Selasa",
          todo: "Isra' Mi'raj",
          status: false
        }
      ],
      id: "",
      title: "",
      todo: "",
      status: false,
      action: "",
      selectedItem: null,
      isModalOpen: false,
      filterTodos: [],
      search: ""
      // user: ""
    }
    this.state.filterTodos = this.state.todos
  }

  // setUser = () => {
  //     if (sessionStorage.getItem("user") === null) {
  //         // jika tdk ada, maka ditambahkan data usernya
  //         let input = window.prompt("Masukkan nama Anda", "")
  //         if (input === null || input === "") {
  //             this.setUser()
  //         }
  //         else {
  //             sessionStorage.setItem("user", input)
  //             this.setState({
  //                 user: input
  //             })
  //         }
  //     }
  //     else {
  //         // jika ada, tinggal ditampilkan data usernya
  //         let userName = sessionStorage.getItem("user")
  //         this.setState({
  //             user : userName
  //         })
  //     }
  // }

  handleClose = () => {
    this.setState({
      isModalOpen: false
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSave = (e) => {
    e.preventDefault()
    let tempTodos = this.state.todos

    if (this.state.action === "insert") {
      tempTodos.unshift({
        id: this.state.id,
        title: this.state.title,
        todo: this.state.todo,
        status: this.state.status
      })
    }
    else if (this.state.action === "update") {
      let index = tempTodos.indexOf(this.state.selectedItem)
      tempTodos[index].id = this.state.id
      tempTodos[index].title = this.state.title
      tempTodos[index].todo = this.state.todo
    }

    this.setState({
      todos: tempTodos,
      filterTodos: tempTodos,
      isModalOpen: false
    })
  }

  add = () => {
    this.setState({
      isModalOpen: true,
      id: Math.floor(Math.random() * 100000),
      title: "",
      todo: "",
      status: false,
      action: "insert"
    })
  }

  edit = (item) => {
    this.setState({
      isModalOpen: true,
      id: item.id,
      title: item.title,
      todo: item.todo,
      action: "update",
      selectedItem: item
    })
  }

  drop = (item) => {
    if (window.confirm("Apakah anda yakin ingin menghapus data ini ?")) {
      let tempTodos = this.state.todos
      let index = tempTodos.indexOf(item)
      tempTodos.splice(index, 1)
      this.setState({
        todos: tempTodos, 
        filterTodos: tempTodos
      })
    }
  }

  check = (item) => {
    let tempTodos = this.state.todos
    let index = tempTodos.indexOf(item)
    if (tempTodos[index].status === false) {
      tempTodos[index].status = true
    }
    else if (tempTodos[index].status === true) {
      tempTodos[index].status = false
    }
    this.setState({
      todos: tempTodos
    })
  }

  // search = (e) => {
  //   e.preventDefault()
  //   let search = this.state.search
  //   let tempTodos = this.state.todos
  //   let result;
  //   if (search === "") {
  //     result = tempTodos
  //   }
  //   else if (search === "all") {
  //     result = tempTodos
  //   }
  //   else if (search === "completed") {
  //     result = tempTodos.filter(item => item.status === true)
  //   }
  //   else if (search === "uncompleted") {
  //     result = tempTodos.filter(item => item.status === false)
  //   }
  //   this.setState({
  //     filterTodos: result
  //   })
  // }

  all = () => {
    // e.preventDefault()
    let tempTodos = this.state.todos
    this.setState({
      filterTodos: tempTodos
    })
  }
  completed = () => {
    // e.preventDefault()
    let tempTodos = this.state.todos
    this.setState({
      filterTodos: tempTodos.filter(item => item.status === true)
    })
  }
  uncompleted = () => {
    // e.preventDefault()
    let tempTodos = this.state.todos
    this.setState({
      filterTodos: tempTodos.filter(item => item.status === false)
    })
  }

  // addToCart = (selectedItem) => {
  //     // console.log('add to cart')
  //     let tempCart = []
  //     if (localStorage.getItem("cart") !== null) {
  //         tempCart = JSON.parse(localStorage.getItem("cart"))
  //     }

  //     let existItem = tempCart.find(item => item.isbn === selectedItem.isbn)
  //     console.log(existItem)
  //     if (existItem) {
  //         window.alert("Anda telah menambahkan produk ini")
  //     }
  //     else {
  //         let jumlah = window.prompt("Masukkan jumlah", "")
  //         if (jumlah !== null && jumlah !== "") {
  //             selectedItem.jumlahBeli = jumlah

  //             tempCart.push(selectedItem)

  //             localStorage.setItem("cart", JSON.stringify(tempCart))
  //         }
  //     }
  // }

  // componentDidMount = () => {
  //     this.setUser()
  // }

  render() {
    return (
      <div className='bg'> 
      <div className='container'>
        <div className="card bg-transparent p-3">
          <div className="alert mb-2 m-1"><h1 className='text-center'>𝓦𝓱𝓪𝓽'𝓼 𝔂𝓸𝓾𝓻 𝓹𝓵𝓪𝓷 𝓯𝓸𝓻 𝓽𝓸𝓭𝓪𝔂?</h1></div>
          <Button variant="outline-dark mb-2 m-1" onClick={() => this.add()}>
            Add Todo
          </Button>{' '}
          {/* <form onSubmit={e => this.search(e)}>
            <select className="form-select mb-3 m-1" name="search" aria-label="Default select example w-100" onChange={this.handleChange} >
              <option></option>
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="uncompleted">Uncompleted</option>
            </select>
            <button className="btn btn-secondary" type="submit">SEARCH</button>
          </form> */}
          <div className="d-flex justify-content-around">
            <Button variant="outline-dark mb-3 w-100 m-1" name="all" onClick={this.all}>
              All
            </Button>{' '}
            <Button variant="outline-dark mb-3 w-100 m-1" name="completed" onClick={this.completed}>
              Completed
            </Button>{' '}
            <Button variant="outline-dark mb-3 w-100 m-1" name="uncompleted" onClick={this.uncompleted}>
              Uncompleted
            </Button>{' '}
          </div>
          {this.state.filterTodos.map((item, index) => (
            <ul className="list-group list-group-horizontal rounded-5 bg-transparent m-1 mt-2" key={item.id}>
              <li className="list-group-item d-flex align-items-center ps-0 pe-3 py-1 m-2 rounded-0 border-0 bg-transparent">
                <button className="btn btn-outline" onClick={() => this.check(item)}>
                  {item.status ? <CheckBoxIcon fontSize="large" /> : <CheckBoxOutlineBlankIcon fontSize="large" />}
                </button>
              </li>
              <li className="list-group-item ps-3 pe-0 py-1 m-5 rounded-0 border-0 bg-transparent w-100">
                <div className="d-flex flex-row justify-content-start mb-1">
                  <h5>{item.title}</h5>
                </div>
                <div className="d-flex flex-row justify-content-start mb-1">
                  <p>{item.todo}</p>
                </div>
              </li>
              <li className="list-group-item ps-3 pe-0 py-1 m-5 rounded-0 border-0 bg-transparent w-100">
                <div className="d-flex flex-row justify-content-end mb-1">
                  <Edit onClick={() => this.edit(item)} fontSize="large" />
                  <DeleteOutlined onClick={() => this.drop(item)} fontSize="large" />
                </div>
                {/* <div className="text-end text-muted">
                  <a href="#!" className="text-muted" data-mdb-toggle="tooltip" title="Created date">
                    <p className="small mb-0"><i className="fas fa-info-circle me-2"></i>{Date()}</p>
                  </a>
                </div> */}
              </li>
            </ul>
          ))}

          <Modal show={this.state.isModalOpen} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Form Todo List</Modal.Title>
            </Modal.Header>
            <Form onSubmit={e => this.handleSave(e)}>
              <Modal.Body className="bgm">
                <Form.Group className="mb-3" controlId="id">
                  <Form.Label>Todo's ID</Form.Label>
                  <Form.Control type="text" name="id" placeholder="Todo's ID"
                    value={this.state.id} onChange={this.handleChange} disabled />
                </Form.Group>
                <Form.Group className="mb-3" controlId="title">
                  <Form.Label>Todo's Title</Form.Label>
                  <Form.Control type="text" name="title" placeholder="Add todo's title"
                    value={this.state.title} onChange={this.handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="todo">
                  <Form.Label>Todo's Content</Form.Label>
                  <Form.Control type="text" name="todo" placeholder="Add todo's content"
                    value={this.state.todo} onChange={this.handleChange} />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="outline-dark" onClick={this.handleClose}>
                  Close
                </Button>
                <Button variant="dark" type="submit">
                  Save
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
        </div>
      </div >
      </div>
    )
  }
}