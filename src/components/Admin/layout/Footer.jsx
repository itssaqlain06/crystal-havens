import React from "react";

export default function Footer() {
  return (
    <div className="container-fluid pt-4 px-4">
      <div className="bg-light rounded-top p-4">
        <div className="row">
          <div className="col-12 col-sm-6 text-center text-sm-start">
            &copy; <a href="#">Crystal Havens</a>, All Right Reserved.
          </div>
          <div className="col-12 col-sm-6 text-center text-sm-end">
            Designed By <a href="mailto:itssaqlain06@gmail.com">Saqlain</a>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}
