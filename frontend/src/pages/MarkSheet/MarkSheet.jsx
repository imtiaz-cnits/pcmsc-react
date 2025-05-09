import { useSearchParams } from "react-router-dom";
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/style.css";
import logo from "../../assets/img/logo.png";
import SkeletonLoader from "../../components/skeleton/SkeletonLoader";
import {
  useFetchEligibleStudent,
  useFetchHighestMark,
  useFetchMarkSheet,
} from "../../hook/useMarkSheet";
import { totalGradeCal } from "../../utils/gradeCal";

const MarkSheet = () => {
  const [searchParams] = useSearchParams();
  const roll = searchParams.get("roll");
  const sectionID = searchParams.get("section");
  const classID = searchParams.get("className");
  const shiftID = searchParams.get("shift");
  const sessionID = searchParams.get("session");
  const examinationID = searchParams.get("examination");

  const filters = {
    roll,
    sectionID,
    classID,
    shiftID,
    sessionID,
    examinationID,
  };

  const studentFilters = {
    roll,
    sectionID,
    classID,
    shiftID,
    sessionID,
  };

  const { data: eligibleStudent, isPending: isEligibleStudentPending } =
    useFetchEligibleStudent(studentFilters);

  const { data: reportCard, isPending, isError } = useFetchMarkSheet(filters);

  const { data: highestMarkReportCard, isPending: ishMarkPending } =
    useFetchHighestMark(filters);

  const finalGrade = totalGradeCal(reportCard?.data, reportCard?.count);

  const highestMarkMap = highestMarkReportCard?.data?.reduce((acc, item) => {
    acc[item.subject._id] = {
      maxMark: item.maxMark,
      studentName: item.studentName,
    };
    return acc;
  }, {});

  const printMarksheet = () => {
    const marksheet = document.querySelector(".marksheet-container");

    // Save the current visibility state of the body
    const originalContent = document.body.innerHTML;

    // Set the body to only contain the marksheet
    document.body.innerHTML = marksheet.outerHTML;

    // Trigger the print dialog
    window.print();

    // Restore the original content
    document.body.innerHTML = originalContent;

    // Rebind any event listeners (if necessary)
    location.reload(); // Reload the page to restore functionality
  };

  return (
    <>
      {/* <!-- Hero Main Content Start --> */}
      <div className="main-content">
        <div className="page-content">
          <div className="marksheet-container marksheet-warermark-bg">
            <div className="watermark">
              <img src={logo} alt="" />
            </div>
            <div className="marksheet-container-wrap">
              <header>
                <div className="info-wrapper">
                  <div className="logo">
                    <img src={logo} alt="Education Board Logo" />
                  </div>
                  <div className="board-info">
                    <h2>Pabna Collectorate Model School And Collage</h2>
                    <p>Zilla Para, Pabna Sadar Pabna</p>
                    <div className="code-info">
                      <h4>
                        EIIN: <span>451211</span>
                      </h4>
                      <div className="bar">|</div>
                      <h4>
                        School Code: <span>451211</span>
                      </h4>
                    </div>
                    <div className="button">
                      <button className="print-icon" onClick={printMarksheet}>
                        <span>
                          <svg
                            width="44"
                            height="44"
                            viewBox="0 0 44 44"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M29.817 17.0382H14.1692C13.8755 17.0382 13.5939 16.9216 13.3863 16.714C13.1787 16.5063 13.062 16.2247 13.062 15.9311V8.10716C13.062 7.81352 13.1787 7.53191 13.3863 7.32428C13.5939 7.11665 13.8755 7 14.1692 7H29.817C30.1107 7 30.3923 7.11665 30.5999 7.32428C30.8075 7.53191 30.9242 7.81352 30.9242 8.10716V15.9311C30.9242 16.2247 30.8075 16.5063 30.5999 16.714C30.3923 16.9216 30.1107 17.0382 29.817 17.0382ZM15.2763 14.8239H28.7099V9.21432H15.2763V14.8239Z"
                              fill="#192045"
                            />
                            <path
                              d="M29.817 36.6719H14.1692C13.8755 36.6719 13.5939 36.5552 13.3863 36.3476C13.1787 36.14 13.062 35.8584 13.062 35.5647V23.5402C13.062 23.2466 13.1787 22.965 13.3863 22.7573C13.5939 22.5497 13.8755 22.4331 14.1692 22.4331H29.817C30.1107 22.4331 30.3923 22.5497 30.5999 22.7573C30.8075 22.965 30.9242 23.2466 30.9242 23.5402V35.5647C30.9242 35.8584 30.8075 36.14 30.5999 36.3476C30.3923 36.5552 30.1107 36.6719 29.817 36.6719ZM15.2763 34.4576H28.7099V24.6474H15.2763V34.4576Z"
                              fill="#192045"
                            />
                            <path
                              d="M33.3784 31.4313H29.8171C29.5234 31.4313 29.2418 31.3147 29.0342 31.107C28.8266 30.8994 28.7099 30.6178 28.7099 30.3242C28.7099 30.0305 28.8266 29.7489 29.0342 29.5413C29.2418 29.3337 29.5234 29.217 29.8171 29.217H33.3784C33.7479 29.2166 34.1021 29.0697 34.3634 28.8084C34.6247 28.5472 34.7716 28.1929 34.772 27.8235V18.4325C34.7718 18.0629 34.6249 17.7085 34.3637 17.4471C34.1024 17.1857 33.748 17.0386 33.3784 17.0382H10.6079C10.2383 17.0386 9.88393 17.1857 9.62265 17.4471C9.36137 17.7085 9.21451 18.0629 9.21432 18.4325V27.8235C9.21471 28.1929 9.36165 28.5472 9.62291 28.8084C9.88417 29.0697 10.2384 29.2166 10.6079 29.217H14.1692C14.4629 29.217 14.7445 29.3337 14.9521 29.5413C15.1597 29.7489 15.2764 30.0305 15.2764 30.3242C15.2764 30.6178 15.1597 30.8994 14.9521 31.107C14.7445 31.3147 14.4629 31.4313 14.1692 31.4313H10.6079C9.65136 31.4302 8.73437 31.0497 8.05801 30.3733C7.38166 29.697 7.00117 28.78 7 27.8235V18.4325C7.00098 17.4759 7.38138 16.5587 8.05775 15.8822C8.73413 15.2057 9.65123 14.8251 10.6079 14.8239H33.3784C34.3351 14.8251 35.2522 15.2057 35.9286 15.8822C36.6049 16.5587 36.9853 17.4759 36.9863 18.4325V27.8235C36.9851 28.78 36.6046 29.697 35.9283 30.3733C35.2519 31.0497 34.335 31.4302 33.3784 31.4313Z"
                              fill="#192045"
                            />
                            <path
                              d="M12.9884 20.8764C12.9519 20.8765 12.9155 20.8748 12.8792 20.8712C12.8437 20.8675 12.8054 20.8616 12.7721 20.855C12.7389 20.8484 12.6983 20.8388 12.6666 20.8284C12.6349 20.8181 12.598 20.8055 12.5647 20.7915C12.5315 20.7775 12.499 20.762 12.4673 20.745C12.435 20.7284 12.4037 20.7099 12.3736 20.6897C12.344 20.6697 12.3145 20.6483 12.2865 20.6254C12.2584 20.6026 12.2311 20.5775 12.2053 20.5516C12.1794 20.5258 12.1551 20.4985 12.1315 20.4704C12.1086 20.4425 12.0872 20.4135 12.0673 20.3833C12.0471 20.3528 12.0286 20.3218 12.0119 20.2903C11.9949 20.2586 11.9794 20.2254 11.9654 20.1922C11.9514 20.159 11.9396 20.1243 11.9285 20.0903C11.9174 20.0564 11.9093 20.0165 11.9019 19.9848C11.8945 19.953 11.8894 19.911 11.8857 19.8777C11.8786 19.8041 11.8786 19.73 11.8857 19.6563C11.8894 19.6209 11.8953 19.5825 11.9019 19.5493C11.9086 19.5161 11.9182 19.4755 11.9285 19.4437C11.9388 19.412 11.9514 19.3751 11.9654 19.3419C11.9794 19.3087 11.9949 19.2754 12.0119 19.2437C12.0289 19.212 12.0473 19.181 12.0673 19.1507C12.0872 19.1206 12.1086 19.0915 12.1315 19.0636C12.1543 19.0356 12.1794 19.0083 12.2053 18.9824C12.2311 18.9566 12.2584 18.9322 12.2865 18.9086C12.3145 18.885 12.344 18.8643 12.3736 18.8444C12.4037 18.8241 12.435 18.8056 12.4673 18.789C12.4993 18.7723 12.5318 18.7568 12.5647 18.7425C12.598 18.7285 12.6326 18.7167 12.6666 18.7056C12.7005 18.6946 12.7404 18.6864 12.7721 18.6791C12.8039 18.6717 12.846 18.6665 12.8792 18.6628C12.9516 18.6562 13.0245 18.6562 13.0969 18.6628C13.1331 18.6665 13.1707 18.6724 13.2047 18.6791C13.2386 18.6857 13.2785 18.6953 13.3095 18.7056C13.3405 18.716 13.3789 18.7285 13.4121 18.7425C13.4453 18.7566 13.4778 18.7721 13.5095 18.789C13.5417 18.8058 13.573 18.8243 13.6033 18.8444C13.6328 18.8643 13.6623 18.8857 13.6903 18.9086C13.7184 18.9315 13.7457 18.9566 13.7715 18.9824C13.7974 19.0083 13.821 19.0356 13.8454 19.0636C13.8697 19.0917 13.8896 19.1212 13.9096 19.1507C13.9295 19.1802 13.9479 19.212 13.9649 19.2437C13.9819 19.2754 13.9974 19.3087 14.0114 19.3419C14.0254 19.3751 14.0373 19.4098 14.0483 19.4437C14.0594 19.4777 14.0675 19.5175 14.0749 19.5493C14.0823 19.581 14.0875 19.6231 14.0911 19.6563C14.0982 19.73 14.0982 19.8041 14.0911 19.8777C14.0875 19.9132 14.0815 19.9516 14.0749 19.9848C14.0683 20.018 14.0587 20.0586 14.0483 20.0903C14.038 20.1221 14.0254 20.159 14.0114 20.1922C13.9974 20.2254 13.9819 20.2586 13.9649 20.2903C13.9479 20.3221 13.9295 20.3531 13.9096 20.3833C13.8896 20.4136 13.8675 20.4424 13.8454 20.4704C13.8232 20.4985 13.7974 20.5258 13.7715 20.5516C13.7457 20.5775 13.7184 20.6018 13.6903 20.6254C13.6623 20.6491 13.6328 20.6697 13.6033 20.6897C13.573 20.7098 13.5417 20.7283 13.5095 20.745C13.4775 20.7617 13.4451 20.7772 13.4121 20.7915C13.3789 20.8055 13.3442 20.8174 13.3095 20.8284C13.2748 20.8395 13.2401 20.8476 13.2047 20.855C13.1692 20.8624 13.1309 20.8675 13.0969 20.8712C13.0609 20.8748 13.0246 20.8765 12.9884 20.8764Z"
                              fill="#192045"
                            />
                            <path
                              d="M16.236 20.8764C16.1998 20.8764 16.1622 20.8764 16.1267 20.8712C16.0913 20.8661 16.0529 20.8616 16.0197 20.855C15.9865 20.8484 15.9459 20.8388 15.9142 20.8284C15.8824 20.8181 15.8455 20.8055 15.8123 20.7915C15.7791 20.7775 15.7459 20.762 15.7141 20.745C15.6824 20.728 15.6514 20.7096 15.6211 20.6897C15.591 20.6698 15.5619 20.6483 15.534 20.6254C15.506 20.6026 15.4787 20.5775 15.4528 20.5516C15.427 20.5258 15.4026 20.4985 15.379 20.4704C15.3554 20.4424 15.3347 20.4129 15.3148 20.3833C15.2946 20.3531 15.2758 20.3218 15.2587 20.2896C15.2425 20.2579 15.227 20.2254 15.213 20.1922C15.1989 20.159 15.1871 20.1243 15.176 20.0903C15.165 20.0564 15.1569 20.0165 15.1495 19.9848C15.1421 19.953 15.1369 19.911 15.1332 19.8777C15.1262 19.8041 15.1262 19.7299 15.1332 19.6563C15.1369 19.6209 15.1428 19.5825 15.1495 19.5493C15.1561 19.5161 15.1657 19.4755 15.176 19.4437C15.1864 19.412 15.1989 19.3751 15.213 19.3419C15.227 19.3087 15.2425 19.2762 15.2587 19.2444C15.2758 19.2123 15.2946 19.181 15.3148 19.1507C15.3347 19.1212 15.3561 19.0917 15.379 19.0636C15.4019 19.0356 15.427 19.0083 15.4528 18.9824C15.4787 18.9566 15.506 18.9322 15.534 18.9086C15.5619 18.8857 15.591 18.8643 15.6211 18.8444C15.6516 18.8242 15.6826 18.8058 15.7141 18.789C15.7459 18.7721 15.7791 18.7566 15.8123 18.7425C15.8455 18.7285 15.8802 18.7167 15.9142 18.7056C15.9481 18.6946 15.988 18.6864 16.0197 18.6791C16.0514 18.6717 16.0935 18.6665 16.1267 18.6628C16.2004 18.656 16.2745 18.656 16.3482 18.6628C16.3836 18.6665 16.422 18.6724 16.4552 18.6791C16.4884 18.6857 16.529 18.6953 16.5607 18.7056C16.5925 18.716 16.6294 18.7285 16.6626 18.7425C16.6958 18.7566 16.7283 18.7721 16.76 18.789C16.7918 18.806 16.8235 18.8245 16.8538 18.8444C16.884 18.8643 16.9128 18.8857 16.9409 18.9086C16.9689 18.9315 16.9962 18.9566 17.0221 18.9824C17.0479 19.0083 17.0715 19.0356 17.0959 19.0636C17.1202 19.0917 17.1401 19.1212 17.1601 19.1507C17.1801 19.181 17.1986 19.2123 17.2154 19.2444C17.2322 19.2764 17.2477 19.3089 17.2619 19.3419C17.276 19.3751 17.2878 19.4098 17.2988 19.4437C17.3099 19.4777 17.318 19.5175 17.3254 19.5493C17.3328 19.581 17.338 19.6231 17.3417 19.6563C17.3487 19.7299 17.3487 19.8041 17.3417 19.8777C17.338 19.9132 17.3321 19.9516 17.3254 19.9848C17.3188 20.018 17.3092 20.0586 17.2988 20.0903C17.2885 20.1221 17.276 20.159 17.2619 20.1922C17.2479 20.2254 17.2324 20.2579 17.2154 20.2896C17.1986 20.3218 17.1801 20.3531 17.1601 20.3833C17.1401 20.4129 17.118 20.4424 17.0959 20.4704C17.0737 20.4985 17.0479 20.5258 17.0221 20.5516C16.9962 20.5775 16.9689 20.6018 16.9409 20.6254C16.9128 20.6491 16.8833 20.6697 16.8538 20.6897C16.8242 20.7096 16.7918 20.728 16.76 20.745C16.7283 20.762 16.6958 20.7775 16.6626 20.7915C16.6294 20.8055 16.5947 20.8174 16.5607 20.8284C16.5268 20.8395 16.4869 20.8476 16.4552 20.855C16.4234 20.8624 16.3814 20.8675 16.3482 20.8712C16.3149 20.8749 16.2721 20.8764 16.236 20.8764Z"
                              fill="#192045"
                            />
                            <path
                              d="M26.3481 28.8479H17.6384C17.3448 28.8479 17.0632 28.7313 16.8555 28.5237C16.6479 28.316 16.5312 28.0344 16.5312 27.7408C16.5312 27.4472 16.6479 27.1655 16.8555 26.9579C17.0632 26.7503 17.3448 26.6336 17.6384 26.6336H26.3481C26.6417 26.6336 26.9233 26.7503 27.1309 26.9579C27.3386 27.1655 27.4552 27.4472 27.4552 27.7408C27.4552 28.0344 27.3386 28.316 27.1309 28.5237C26.9233 28.7313 26.6417 28.8479 26.3481 28.8479Z"
                              fill="#192045"
                            />
                            <path
                              d="M26.3481 32.7599H17.6384C17.3448 32.7599 17.0632 32.6433 16.8555 32.4356C16.6479 32.228 16.5312 31.9464 16.5312 31.6528C16.5312 31.3591 16.6479 31.0775 16.8555 30.8699C17.0632 30.6622 17.3448 30.5456 17.6384 30.5456H26.3481C26.6417 30.5456 26.9233 30.6622 27.1309 30.8699C27.3386 31.0775 27.4552 31.3591 27.4552 31.6528C27.4552 31.9464 27.3386 32.228 27.1309 32.4356C26.9233 32.6433 26.6417 32.7599 26.3481 32.7599Z"
                              fill="#192045"
                            />
                          </svg>
                        </span>
                        <span className="text">Print</span>
                      </button>
                    </div>
                  </div>
                  <table>
                    <thead>
                      <tr>
                        <th>
                          <span>Range</span>
                        </th>
                        <th>
                          <span>Grade</span>
                        </th>
                        <th>
                          <span>GPA</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <span>80-100</span>
                        </td>
                        <td>
                          <span>A+</span>
                        </td>
                        <td>
                          <span>5.00</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span>70-79</span>
                        </td>
                        <td>
                          <span>A</span>
                        </td>
                        <td>
                          <span>4.00</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span>60-69</span>
                        </td>
                        <td>
                          <span>A-</span>
                        </td>
                        <td>
                          <span>3.50</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span>50-59</span>
                        </td>
                        <td>
                          <span>B</span>
                        </td>
                        <td>
                          <span>3.00</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span>40-49</span>
                        </td>
                        <td>
                          <span>C</span>
                        </td>
                        <td>
                          <span>2.00</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span>0-39</span>
                        </td>
                        <td>
                          <span>F</span>
                        </td>
                        <td>
                          <span>0.00</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </header>

              <div className="result-section">
                <h3>Progress Report</h3>
                <div className="student-info-table">
                  <table className="student-info">
                    {isEligibleStudentPending || isPending ? (
                      <SkeletonLoader />
                    ) : (
                      <>
                        <tr>
                          <td>
                            <span>Student Name:</span>
                          </td>
                          <td>
                            <span>{eligibleStudent?.data[0]?.name}</span>
                          </td>
                          <td>
                            <span>Roll No:</span>
                          </td>
                          <td>
                            <span>{eligibleStudent?.data[0]?.studentRoll}</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span>Father's Name:</span>
                          </td>
                          <td>
                            <span>{eligibleStudent?.data[0]?.fatherName}</span>
                          </td>

                          <td>
                            <span>Group:</span>
                          </td>
                          <td>
                            <span>
                              {eligibleStudent?.data[0]?.group?.nameLabel}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span>Mother's Name:</span>
                          </td>
                          <td>
                            <span> {eligibleStudent?.data[0]?.motherName}</span>
                          </td>
                          <td>
                            <span>Exam:</span>
                          </td>
                          <td>
                            {/* // todo */}
                            <span>
                              {reportCard?.data[0]?.examType?.examTypeName}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span>Student ID:</span>
                          </td>
                          <td>
                            <span>{eligibleStudent?.data[0]?.studentID}</span>
                          </td>
                          <td>
                            <span>Year/Session:</span>
                          </td>
                          <td>
                            <span>
                              {eligibleStudent?.data[0]?.session?.nameLabel}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span>Class:</span>
                          </td>
                          <td colSpan="3">
                            <span>
                              {eligibleStudent?.data[0]?.className?.nameLabel}
                            </span>
                          </td>
                        </tr>
                      </>
                    )}
                  </table>
                </div>
              </div>

              <div className="grade-sheet">
                <div className="grade-sheet-table">
                  <table>
                    <thead>
                      <tr>
                        <th rowSpan="2">Code</th>
                        <th rowSpan="2" className="sub-name">
                          Subject Name
                        </th>
                        <th rowSpan="2">Full Marks</th>
                        <th rowSpan="2">Highest Marks</th>
                        <th colSpan="4">Obtaining Marks</th>
                        <th rowSpan="2">Total Marks</th>
                        <th rowSpan="2">Letter Grade</th>
                        <th rowSpan="2">Grade Point</th>
                      </tr>
                      <tr>
                        <th>MCQ</th>
                        <th>WRITEN</th>
                        <th>CA</th>
                        <th>CT</th>
                      </tr>
                    </thead>
                    <tbody>
                      {isPending ||
                      isEligibleStudentPending ||
                      ishMarkPending ? (
                        <SkeletonLoader />
                      ) : isError ? (
                        <SkeletonLoader />
                      ) : reportCard.totalEntries <= 0 ? (
                        <p>not found </p>
                      ) : (
                        reportCard?.data?.length > 0 &&
                        reportCard?.data?.map((item, idx) => (
                          <>
                            <tr key={`${idx}-subject-info`}>
                              <td>
                                <span>{item?.subject?.subjectCode}</span>
                              </td>
                              <td className="subject">
                                <span>{item?.subject?.subjectName}</span>
                              </td>
                              <td>
                                <span>100</span>
                              </td>
                              <td>
                                <span>
                                  {highestMarkMap[item?.subject?._id]
                                    ?.maxMark || "N/A"}{" "}
                                </span>
                              </td>
                              <td>
                                <span>{item?.mcqMark}</span>
                              </td>
                              <td>
                                <span>{item?.writtenMark}</span>
                              </td>
                              <td>
                                <span>{item?.caMark}</span>
                              </td>
                              <td>
                                <span>{item?.ctMark}</span>
                              </td>
                              <td>
                                <span>{item?.totalMark}</span>
                              </td>
                              <td>
                                <span>{item?.letterGrade}</span>
                              </td>
                              <td>
                                <span>{item?.gradePoint}</span>
                              </td>
                            </tr>
                          </>
                        ))
                      )}

                      {isPending || isEligibleStudentPending ? (
                        <SkeletonLoader />
                      ) : isError ? (
                        <SkeletonLoader />
                      ) : (
                        <tr>
                          <td colSpan="2">
                            <span>Total Exam Marks</span>
                          </td>
                          <td>
                            <span>1000</span>
                          </td>
                          <td colSpan="5">
                            <span>Obtained Marks & GPA</span>
                          </td>
                          <td>
                            <span>
                              {reportCard?.data?.reduce(
                                (acc, cur) => acc + cur.totalMark,
                                0,
                              )}
                            </span>
                          </td>
                          <td>
                            <span>{finalGrade.letterGrade}</span>
                          </td>
                          <td>
                            <span>{finalGrade.gradePoint}</span>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="second-table d-flex align-items-start gap-2">
                  <table>
                    <tr>
                      <td className="subject">
                        <span>Result Status</span>
                      </td>
                      <td>
                        <span>Passed</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="subject">
                        <span>Section Position</span>
                      </td>
                      <td>
                        <span>5</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="subject">
                        <span>GPA [Without 4th]</span>
                      </td>
                      <td>
                        <span>4.6</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="subject">
                        <span>Failed Subject [S]</span>
                      </td>
                      <td>
                        <span>0</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="subject">
                        <span>Working Day</span>
                      </td>
                      <td>
                        <span>N/A</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="subject">
                        <span>Total Present</span>
                      </td>
                      <td>
                        <span>N/A</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="subject">
                        <span>Total Absent</span>
                      </td>
                      <td>
                        <span>N/A</span>
                      </td>
                    </tr>
                  </table>
                  <table className="check-table">
                    <thead>
                      <tr>
                        <th colSpan="2">Moral & Behavior Evaluation</th>
                        <th colSpan="2">Co-Curricular Activities</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="check">
                          <span></span>
                        </td>
                        <td>
                          <span>Excellent</span>
                        </td>
                        <td className="check">
                          <span></span>
                        </td>
                        <td>
                          <span>Sports</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="check">
                          <span></span>
                        </td>
                        <td>
                          <span>Good</span>
                        </td>
                        <td className="check">
                          <span></span>
                        </td>
                        <td>
                          <span>Cultural Function</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="check">
                          <span></span>
                        </td>
                        <td>
                          <span>Average</span>
                        </td>
                        <td className="check">
                          <span></span>
                        </td>
                        <td>
                          <span>Scout/BNCC</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="check">
                          <span></span>
                        </td>
                        <td>
                          <span>Poor</span>
                        </td>
                        <td className="check">
                          <span></span>
                        </td>
                        <td>
                          <span>Math Olympiad</span>
                        </td>
                      </tr>
                      <tr>
                        <td rowSpan="6" colSpan="4" className="comments">
                          <span>Comments:</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="signature">
              <div className="guardian">
                <span>Guardian</span>
              </div>
              <div className="className-teacher">
                <span>Class Teacher</span>
              </div>
              <div className="vice-principal">
                <span>Vice Principal</span>
              </div>
            </div>
          </div>
          <div className="copyright">
            <p>&copy; 2024. All Rights Reserved.</p>
          </div>
          {/* <!-- Table End --> */}
        </div>
      </div>
      {/* <!-- Hero Main Content End --> */}
    </>
  );
};

export default MarkSheet;
