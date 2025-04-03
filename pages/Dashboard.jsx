import { ApiClient } from "adminjs";
import React, { useEffect, useState } from "react";

const addCustomCss = () => {
  const existingLink = document.querySelector("link[href='output.css']");
  if (!existingLink) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = "output.css";
    document.head.appendChild(link);
  }
};

export default function Dashboard() {
  const [data, setData] = useState(null);
  const api = new ApiClient();

  addCustomCss();

  useEffect(() => {
    api
      .getDashboard()
      .then((response) => {
        setData(response.data); // { message: 'Hello World' }
      })
      .catch((error) => {
        // handle any errors
      });
  }, []);
  return (
    <div className="p-8">
      {data && (
        <div>
          <div className="flex flex-row flex-wrap gap-5 mb-4 justify-center">
            <div className="p-5 rounded-lg border border-green-300 border-solid text-center shadow-md bg-green-200/25 text-green-500">
              <p className="text-6xl">
                {data.activeInLast24Hour.toLocaleString()}
              </p>
              <p className="text-2xl mt-3">Active in 24H</p>
            </div>
            <div className="p-5 rounded-lg border border-green-300 border-solid text-center shadow-md bg-green-200/25 text-green-500">
              <p className="text-6xl">
                {data.registeredInLast24Hour.toLocaleString()}
              </p>
              <p className="text-2xl mt-3">Registered in 24H</p>
            </div>
          </div>
          <hr />
          <div className="flex flex-row flex-wrap gap-5 mt-4 justify-center">
            <div className="p-5 rounded-lg border border-blue-300 border-solid text-center shadow-md bg-blue-200/25 text-blue-500">
              <p className="text-6xl">{data.totalUser.toLocaleString()}</p>
              <p className="text-2xl mt-3">Total user</p>
            </div>
            <div className="p-5 rounded-lg border border-blue-300 border-solid text-center shadow-md bg-blue-200/25 text-blue-500">
              <p className="text-6xl">{data.totalNode.toLocaleString()}</p>
              <p className="text-2xl mt-3">Total node</p>
            </div>
            <div className="p-5 rounded-lg border border-blue-300 border-solid text-center shadow-md bg-blue-200/25 text-blue-500">
              <p className="text-6xl">{data.totalPost.toLocaleString()}</p>
              <p className="text-2xl mt-3">Total post</p>
            </div>
            <div className="p-5 rounded-lg border border-blue-300 border-solid text-center shadow-md bg-blue-200/25 text-blue-500">
              <p className="text-6xl">{data.totalEvent.toLocaleString()}</p>
              <p className="text-2xl mt-3">Total event</p>
            </div>
            <div className="p-5 rounded-lg border border-blue-300 border-solid text-center shadow-md bg-blue-200/25 text-blue-500">
              <p className="text-6xl">{data.totalReport.toLocaleString()}</p>
              <p className="text-2xl mt-3">Total report</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
