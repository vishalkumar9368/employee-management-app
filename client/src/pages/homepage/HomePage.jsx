import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const features = [
    {
      title: "Who We Are",
      description:
        "We are a team of innovators dedicated to transforming the way businesses manage their workforce.",
    },
    {
      title: "Our Mission",
      description:
        "To provide businesses with an efficient, data-driven, and secure employee management system.",
    },
    {
      title: "Our Vision",
      description:
        "To become the world's leading workforce management platform, streamlining HR operations globally.",
    },
  ];

  const reviews = [
    {
      name: "Alex Johnson (HR Manager, TechCorp)",
      review:
        "This system transformed how we handle HR operations - fast, secure, and easy to use!",
    },
    {
      name: "David Smith (HR Head, Global Solutions)",
      review:
        "Highly secure and reliable. Exactly what we needed for seamless employee management.",
    },
    {
      name: "Sarah Williams (CEO, StartUpX)",
      review:
        "The automation features saved us hours of manual work every month!",
    },
  ];

  return (
    <div>
      {/* hero */}
      <section className="py-20 flex flex-col items-center justify-center gap-4">
        <h1 className=" text-5xl font-bold max-w-6xl text-center px-4 text-gray-800">
          Effortless Employee Management for
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
            {" "}
            Growing Businesses
          </span>
        </h1>
        <p className="text-center max-w-5xl text-lg m-10 px-4 text-gray-600">
          Manage your workforce with ease using our powerful employee management
          system. Track records, analyze data, and enhance productivity with
          just a few clicks.
        </p>
        <div className="flex gap-5 md:gap-10 items-center justify-center font-semibold text-lg">
          <button className="bg-blue-600 px-10 py-3 rounded-3xl text-white shadow-lg transition duration-300 hover:opacity-90">
            <Link to="/records"> Try Now</Link>
          </button>
          <button className="bg-purple-600 px-8 py-3 rounded-3xl text-white shadow-lg transition duration-300 hover:opacity-90">
            <a href="#about"> Explore More</a>
          </button>
        </div>
      </section>
      {/* features */}
      <section className="p-20 px-6 text-center " id="about">
        <h2 className="text-4xl font-bold text-gray-800 mb-10">
          Empowering Businesses with Smart Workforce Solutions
        </h2>
        <ul className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
          {features.map((item, index) => (
            <li
              key={index}
              className="bg-white p-8 rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300"
            >
              <h3 className="text-xl font-semibold text-blue-600 mb-4">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.description}</p>
            </li>
          ))}
        </ul>
      </section>
      {/* testimonial */}
      <section className="p-20 px-6 text-center bg-purple-50">
        <h2 className="text-4xl font-bold text-gray-800 mb-10">
          What Our Users Say
        </h2>
        <ul className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
          {reviews.map((item, index) => (
            <li
              key={index}
              className="bg-white p-8 rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300"
            >
              <p className="text-gray-600 italic">"{item.review}"</p>
              <h3 className=" font-semibold text-purple-600 mt-6">
                {item.name}
              </h3>
            </li>
          ))}
        </ul>
      </section>
      {/* CTA */}
      <section className="p-20 px-6 text-center bg-purple-50 bg-gradient-to-r from-purple-200 to-blue-200">
        <h2 className="text-4xl font-bold text-gray-800 mb-10">
          Ready to Get Started?
        </h2>
        <p className="text-lg text-gray-800 max-w-2xl mx-auto mb-8">
          Join thousands of businesses optimizing their employee management with
          ease.
        </p>
        <Link
          to="/register"
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 text-white font-semibold py-3 px-10 rounded-full shadow-lg transition duration-300"
        >
          Sign Up Now
        </Link>
      </section>
      {/* Footer */}
      <footer className="py-8 bg-gray-900 text-center text-gray-400">
        <p className="text-sm">
          &copy; 2025 Employee Management System. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
