import HeadlessUI from "../components/HeadlessUI";

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen mx-5">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
        Find the weather forecast of your city
      </h1>
      <h3 className="text-lg mb-4 text-gray-600">Enter city name</h3>
      <HeadlessUI />
    </div>
  );
};

export default Home;
