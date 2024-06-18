import React from "react";
import NavBar from "../../components/landingPage/NavBar";
import { Button, Card } from "flowbite-react";
import FooterSection from "../../components/landingPage/FooterSection";
import { Link } from "react-router-dom";
import management from "../../images/management.jpg";
import emp from "../../images/lasitha.jpeg";
import feedback from "../../images/Feedback.jpg";
import Finance from "../../images/Finance.jpg";
import Reservation from "../../images/Reservation.jpg";
import Inventory from "../../images/Inventory.jpg";
import Maintenance from "../../images/Maintenance (1).jpg";
import Rental from "../../images/Rental.jpg";
import Service from "../../images/Service Management.jpg";
import bg from "../../images/viewAdminBG.jpg";
const AdminDashboardLayout = () => {
  const admindashbord = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
  };

  const classgrid = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    marginTop: "40px",
    gridColumnGap: "20px",
    marginLeft: "10px",
    marginRight: "10px",
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <NavBar />
      <div>
        {/*1st row*/}
        <div>
          <div style={classgrid}>
            <Card
              style={{
                backgroundImage: `url(${management})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            >
              <div style={admindashbord}>
                <div>
                  <img
                    style={{
                      width: `1000px`,
                      height: `250px`,
                      borderRadius: "20px",
                    }}
                    src={emp}
                    alt="Employee Management"
                  />
                </div>
                <div style={{ marginLeft: "75px" }}>
                  <h5
                    className="text-3xl font-bold tracking-tight text-blue-600 dark:text-white"
                    style={{ marginBottom: `20px` }}
                  >
                    Employee Management
                  </h5>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    Handle scheduling, training, and performance tracking for
                    staff members.
                  </p>
                  <div className="mt-8">
                    <Link to={`/admin/empdashboard`}>
                      <Button className="bg-sidebar-orange">
                        Read more
                        <svg
                          className="w-4 h-4 ml-2 -mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>

            <Card
              style={{
                backgroundImage: `url(${management})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            >
              <div style={admindashbord}>
                <div>
                  <img
                    style={{
                      width: "1000px",
                      height: "250px",
                      borderRadius: "20px",
                    }}
                    src={Rental}
                    alt="Rental Management"
                  />
                </div>
                <div style={{ marginLeft: "75px" }}>
                  <h5
                    className="text-3xl font-bold tracking-tight text-blue-600 dark:text-white"
                    style={{ marginBottom: `20px` }}
                  >
                    Rental Management
                  </h5>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    Organize the process of renting out lighting, sound systems,
                    and equipment to clients.
                  </p>
                  <div className="mt-8">
                    <Link to={`/admin/rental/dashboard`}>
                      <Button className="bg-sidebar-orange">
                        Read more
                        <svg
                          className="w-4 h-4 ml-2 -mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          {/* Finance Management */}
          <div>
            <div style={classgrid}>
              <Card
                style={{
                  backgroundImage: `url(${management})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              >
                <div style={admindashbord}>
                  <div>
                    <img
                      style={{
                        width: "1000px",
                        height: "250px",
                        borderRadius: "20px",
                      }}
                      src={Finance}
                      alt="Finance Management"
                    />
                  </div>
                  <div style={{ marginLeft: "75px" }}>
                    <h5
                      className="text-3xl font-bold tracking-tight text-blue-600 dark:text-white"
                      style={{ marginBottom: `20px` }}
                    >
                      Finance Management
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                      Track expenses, revenue, and financial transactions
                      related to rentals and services.
                    </p>
                    <div className="mt-8">
                      <Link to={`/admin/finance/dashboard`}>
                        <Button className="bg-sidebar-orange">
                          Read more
                          <svg
                            className="w-4 h-4 ml-2 -mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>

              <Card
                style={{
                  backgroundImage: `url(${management})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              >
                <div style={admindashbord}>
                  <div>
                    <img
                      style={{
                        width: `1000px`,
                        height: `250px`,
                        borderRadius: "20px",
                      }}
                      src={feedback}
                      alt="Feedback and Review Management"
                    />
                  </div>
                  <div style={{ marginLeft: "75px" }}>
                    <h5
                      className="text-3xl font-bold tracking-tight text-blue-600 dark:text-white"
                      style={{ marginBottom: `20px` }}
                    >
                      Feedback & Review Management
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                      Collect and analyze feedback from clients to improve
                      services and address any concerns.
                    </p>
                    <div className="mt-8">
                      <Link to={`/admin/feedback/dashboard/`}>
                        <Button className="bg-sidebar-orange">
                          Read more
                          <svg
                            className="w-4 h-4 ml-2 -mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <div style={classgrid}>
            <Card
              style={{
                backgroundImage: `url(${management})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            >
              <div style={admindashbord}>
                <div>
                  <img
                    style={{
                      width: "1000px",
                      height: "250px",
                      borderRadius: "20px",
                    }}
                    src={Inventory}
                    alt="Inventory Management"
                  />
                </div>
                <div style={{ marginLeft: "75px" }}>
                  <h5
                    className="text-3xl font-bold tracking-tight text-blue-600 dark:text-white"
                    style={{ marginBottom: `20px` }}
                  >
                    Inventory Management
                  </h5>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    Maintain a database of available equipment, ensuring
                    efficient allocation and tracking of items.
                  </p>
                  <div className="mt-8">
                    <Link to={`/admin/inventory/dashboard`}>
                      <Button className="bg-sidebar-orange">
                        Read more
                        <svg
                          className="w-4 h-4 ml-2 -mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>

            <Card
              style={{
                backgroundImage: `url(${management})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            >
              <div style={admindashbord}>
                <div>
                  <img
                    style={{
                      width: `1000px`,
                      height: `250px`,
                      borderRadius: "20px",
                    }}
                    src={Maintenance}
                    alt="Maintenance Management"
                  />
                </div>
                <div style={{ marginLeft: "75px" }}>
                  <h5
                    className="text-3xl font-bold tracking-tight text-blue-600 dark:text-white"
                    style={{ marginBottom: `20px` }}
                  >
                    Maintenance Management
                  </h5>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    Schedule and track maintenance tasks to ensure equipment is
                    in optimal condition for rental and use.
                  </p>
                  <div className="mt-8">
                    <Link to={`/admin/maintain/dashboard`}>
                      <Button className="bg-sidebar-orange">
                        Read more
                        <svg
                          className="w-4 h-4 ml-2 -mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div style={classgrid} className="mb-8">
          <Card
            style={{
              backgroundImage: `url(${management})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <div style={admindashbord}>
              <div>
                <img
                  style={{
                    width: `1000px`,
                    height: `250px`,
                    borderRadius: "20px",
                  }}
                  src={Reservation}
                  alt="reservation Management"
                />
              </div>
              <div style={{ marginLeft: "75px" }}>
                <h5
                  className="text-3xl font-bold tracking-tight text-blue-600 dark:text-white"
                  style={{ marginBottom: `20px` }}
                >
                  Reservation Management
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  Facilitate the booking and scheduling of equipment and
                  services for clients.
                </p>
                <div className="mt-12">
                  <Link to={`/admin/reservation/dashboard`}>
                    <Button className="bg-sidebar-orange">
                      Read more
                      <svg
                        className="w-4 h-4 ml-2 -mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>

          <Card
            style={{
              backgroundImage: `url(${management})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <div style={admindashbord}>
              <div>
                <img
                  style={{
                    width: `1000px`,
                    height: `250px`,
                    borderRadius: "20px",
                  }}
                  src={Service}
                  alt="Service Management"
                />
              </div>
              <div style={{ marginLeft: "75px" }}>
                <h5
                  className="text-3xl font-bold tracking-tight text-blue-600 dark:text-white"
                  style={{ marginBottom: `20px` }}
                >
                  Service Management
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  Coordinate the delivery, setup, and teardown of equipment and
                  technical support during events.
                </p>
                <div className="mt-8">
                  <Link to={`/admin/service/dashboard`}>
                    <Button className="bg-sidebar-orange">
                      Read more
                      <svg
                        className="w-4 h-4 ml-2 -mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <FooterSection />
    </div>
  );
};

export default AdminDashboardLayout;
