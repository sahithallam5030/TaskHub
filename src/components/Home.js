import React from 'react'
import Header from './Header'
import todo from '../images/todobanner.svg'
import Footer from './Footer'

function Home() {
  return (
    <div>
      <Header/>
      <div className="outer">

      <div className="banner container">
        <div className="left-banner">
            <h1>Welcome to TaskHub</h1>
            <p>Simplify your day with our intuitive todo list. Effortlessly organize tasks, boost productivity, and achieve more with the simplicity of Task Hub.</p>
        </div>
        <div className="right-banner">
            <img src={todo} alt="todo" />
        </div>
      </div>
      </div>
      <div className="container">

      <div className="home-para">
        <h5>Welcome to Task Hub, your go-to destination for streamlined productivity. Say goodbye to chaos and hello to simplicity with our intuitive todo list. Organize your tasks effortlessly, prioritize with ease, and reclaim control over your day. 
        </h5><h5>Elevate your productivity journey with Task Hub – where efficiency meets simplicity, where simplicity meets productivity. Effortlessly manage your to-do list, prioritize tasks, and conquer your day with ease. Our user-friendly interface ensures a seamless experience, allowing you to focus on what matters most. From work projects to personal goals, Task Hub empowers you to stay organized and accomplish more. Join us on a journey of efficiency and simplicity – welcome to the heart of productive living with Task Hub.</h5>
      </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Home
