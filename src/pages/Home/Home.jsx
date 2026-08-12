import React from 'react'
import { NavLink } from "react-router-dom";
const Home = () => {
  return (
    <>
        {/* Hero */} 
        <section className="bg-gray-50 px-6 py-24"> 
          <div className="mx-auto max-w-5xl text-center"> 
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 md:text-6xl"> Find great talent. <span className="block text-blue-600"> Build great projects. </span> 
            </h1> 
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600"> Freelance Hub connects talented freelancers with employers looking for skilled professionals to bring their ideas to life. </p> 
            </div> 
        </section> 
        {/* Choose your path */} 
        <section className="bg-white px-6 py-16"> 
          <div className="mx-auto max-w-4xl"> 
            <h2 className="text-center text-2xl font-bold text-gray-900"> What are you looking for? </h2> 
            <div className="mt-8 grid gap-6 sm:grid-cols-2"> 
              {/* Freelancer */} 
              <button className="group rounded-xl border border-gray-200 bg-white p-8 text-left shadow-sm transition hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg"> 
                <h3 className="text-xl font-semibold text-gray-900"> I'm a Freelancer </h3> 
                <p className="mt-2 text-gray-600"> Find projects, showcase your skills, and connect with employers looking for talented professionals. </p> 
                <NavLink to="/app/jobs" className="mt-6 inline-block font-semibold text-blue-600 hover:text-blue-700">Find Work →</NavLink>
              </button> 
              {/* Employer */} 
              <button className="group rounded-xl border border-gray-200 bg-white p-8 text-left shadow-sm transition hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg"> 
                <h3 className="text-xl font-semibold text-gray-900"> I'm an Employer </h3> 
                <p className="mt-2 text-gray-600"> Find skilled freelancers, post projects, and build your team with the right talent. </p> 
                <NavLink to="/app/freelancers" className="mt-6 inline-block font-semibold text-blue-600 group-hover:text-blue-700">Find Talent → </NavLink>
              </button> 
            </div> 
          </div> 
        </section> 
        
      </>
  )
}

export default Home