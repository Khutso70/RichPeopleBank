const heroSection = document.querySelector("#hero");
const btnLogin = document.querySelector("#btn-logIn");
const btnRegister = document.querySelector("#btn-Register");
const swtich = document.querySelector(".txt-switch");
const logOrRegDiv = document.querySelector("#loginOrReg");
const btnLogOut = document.querySelector("#btn-logout");
const btnDelete = document.querySelector("#btn-Delete");
const btnNavLogIn = document.querySelector("#nav-btn-logIn");
const btnNavRegister = document.querySelector("#nav-btn-register");

let inputUserName = document.querySelector("#inputUserName"); // "let" for changing users so it can change else it was also a const
const inputUserPassword = document.querySelector("#inputPasswordLogin");

const accountSection = document.querySelector("#accountSection");
const nameDisplay = document.querySelector("#name-display");
const balanceDisplay = document.querySelector("#balance-display");
const tableBody = document.querySelector("#table-body");

const btnDeposit = document.querySelector("#btn-deposit");
const btnWithdraw = document.querySelector("#btn-withdraw");
const btnTransfer = document.querySelector("#btn-transfer");
const inputDeposit = document.querySelector("#input-deposit");
const inputWithdraw = document.querySelector("#input-withdraw");
const inputTransfer = document.querySelector("#input-transfer");
const inputTransferUserName = document.querySelector(
  "#input-transfer-user-name"
);

//--------------------------------END OF INITIALIZATION FOR DOM ELEMENTS--------------------------------
let newUser = {
  userName: "",
  password: "",
  transections: [],
};

const john = {
  userName: "john01",
  password: "1111",
  transections: [123, 5154, 48, 6, -486, -944, -510, 46],
};
const thabo = {
  userName: "thabo02",
  password: "2222",
  transections: [125, 56, 979, -456, 48, -594, 346],
};
const khutso = {
  userName: "khutso03",
  password: "3333",
  transections: [945.48, 12354, 77895.52, 100.01, -4586, 24, -49894],
};
const thamaga = {
  userName: "thamaga04",
  password: "4444",
  transections: [96, 548, 344, 97, -98, 976, 365],
};
let arrUser = [john, thabo, khutso, thamaga];

//---------------------------------------------------
function addNewUser() {
  if (
    inputUserName.value != "" &&
    inputUserPassword.value != "" &&
    inputUserPassword.value.length > 3 &&
    inputUserName.value.length > 2
  ) {
    newUser.userName = inputUserName.value;
    newUser.password = inputUserPassword.value;
    arrUser.push(newUser);
    alert(`🍷Welcome to the winning team ${inputUserName.value}🍷`);
    switchOption();
  } else {
    alert("Make Sure You Entered A Valid user Name and Password");
  }
}
btnRegister.addEventListener("click", addNewUser);
//---------------------------------------------------
function loginLogOut() {
  if (heroSection.classList.contains("hidden")) {
    heroSection.classList.remove("hidden");
    accountSection.classList.add("hidden");
  } else {
    heroSection.classList.add("hidden");
    accountSection.classList.remove("hidden");
  }
}
//-----------------------------------------------------
function clearinputs() {
  inputDeposit.value = "";
  inputTransfer.value = "";
  inputTransferUserName.value = "";
  inputWithdraw.value = "";
  inputUserName.value = "";
  inputUserPassword.value = "";
}
//-----------------------------------------------------

//-----------------------------------------------------

function checkIfLogged() {
  if (heroSection.classList.contains("hidden")) {
    alert("You Have Logged In Already. Try To Log Out First");
  } else {
    loginLogOut();
    clearinputs();
  }
}

//-----------------------Funct--------------------------
function loginFunction() {
  for (let i in arrUser) {
    let sum = 0;
    let type = "";
    let html = "";
    let color = "";
    if (
      inputUserName.value == arrUser[i].userName &&
      inputUserPassword.value == arrUser[i].password
    ) {
      alert(
        `Welcome back ${arrUser[i].userName
          .toUpperCase()
          .slice(0, arrUser[i].userName.length)}` //change it so it can also work for 100+
      );

      btnTransfer.addEventListener("click", function () {
        let next;
        for (next = 0; next < arrUser.length; next++) {
          if (arrUser[next].userName == inputTransferUserName.value) {
            if (sum >= Number(inputTransfer.value)) {
              sum = 0;
              arrUser[i].transections.push(Number("-" + inputTransfer.value));
              arrUser[next].transections.push(Number(inputTransfer.value));
              displayTransections();
              displayBalance();
              clearinputs();
            } else {
              alert(
                `${
                  arrUser[i].userName
                } You dont have Enough Money:\nAvailable Balance: R${sum.toLocaleString(
                  undefined,
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                    useGrouping: true,
                  }
                )}`
              );
            }
            break;
          } else if (next == arrUser.length - 1) {
            alert("Account Does Not Exist");
          }
        }
      });

      btnWithdraw.addEventListener("click", function () {
        if (sum >= Number(inputWithdraw.value)) {
          sum = 0;
          arrUser[i].transections.push(Number("-" + inputWithdraw.value));
          displayTransections();
          displayBalance();
          clearinputs();
        } else {
          alert(
            `${
              arrUser[i].userName
            } You dont have Enough Money:\nAvailable Balance: R${sum.toLocaleString(
              undefined,
              {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
                useGrouping: true,
              }
            )}`
          );
        }
      });

      btnDeposit.addEventListener("click", function () {
        sum = 0;
        arrUser[i].transections.push(Number(inputDeposit.value));
        displayTransections();
        displayBalance();
        clearinputs();
      });
      btnDelete.addEventListener("click", function () {
        let deleteConfirm = confirm(
          `Are you sure to remove ${arrUser[i].userName}?`
        );
        if (deleteConfirm) {
          loginLogOut();
          alert(`${arrUser[i].userName}'s Account has been deleted`);
          arrUser[i] = "deleted";
        } else {
          alert(`${arrUser[i].userName}'s Account Not deleted`);
        }
      });

      loginLogOut();
      nameDisplay.textContent = arrUser[i].userName.toUpperCase();

      function displayTransections() {
        tableBody.innerHTML = "";

        for (let count = 0; count < arrUser[i].transections.length; count++) {
          sum += arrUser[i].transections[count];

          if (arrUser[i].transections[count] > 0) {
            type = "Deposit";
            color = "success";
          } else if (arrUser[i].transections[count] < 0) {
            type = "Withdraw";
            color = "danger";
          }
          const currentDate = new Date();

          // Get the various components of the date
          const year = currentDate.getFullYear();
          const month = currentDate.getMonth() + 1; // Month is zero-indexed, so we add 1
          const day = currentDate.getDate();

          html = `<tr>
        <th scope="row">(${count + 1})</th>
        <td>${arrUser[i].transections[count]}</td>
        <td class='text-${color}'>${type}</td>
        <td>${year}-${month}-${day}
        </td>
        </tr>`;

          tableBody.insertAdjacentHTML("afterbegin", html);
        }
      }
      function logOutFunction() {
        // i = -1;
        sum = 0;

        console.log(sum);
        loginLogOut();
        clearinputs();
      }
      btnLogOut.addEventListener("click", logOutFunction);
      displayTransections();
      function displayBalance() {
        balanceDisplay.textContent = `Balance: R${sum.toLocaleString(
          undefined,
          {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            useGrouping: true,
          }
        )}`;
      }
      displayBalance();
      break;
    } else if (i == arrUser.length - 1) {
      alert("Incorrect Password Or Username");
    }
  }
}

//-----------------------------------------------------
function switchOption() {
  if (btnLogin.classList.contains("hidden")) {
    btnLogin.classList.remove("hidden");
    btnRegister.classList.add("hidden");

    heroSection.style =
      "background: url(images/smartphone-with-money-credit-card-wallet_23-2148080971.jpg);";

    logOrRegDiv.classList.add("loginDiv");
    logOrRegDiv.classList.remove("registerDiv");
    swtich.textContent = "Register";
  } else {
    btnLogin.classList.add("hidden");
    btnRegister.classList.remove("hidden");
    logOrRegDiv.classList.remove("loginDiv");
    logOrRegDiv.classList.add("registerDiv");
    heroSection.style =
      "background: url(images/winner-celebration-raining-money-with-black-woman-spray-cash-investment-wealth-achievement-success-profit-with-excited-young-female-after-winning-lotto-cashback-promotion_590464-83806.jpeg);";
    swtich.textContent = "Log In";
  }
}

//-----------------------------------------------------

swtich.addEventListener("click", switchOption);
btnLogin.addEventListener("click", loginFunction);

btnNavRegister.addEventListener("click", checkIfLogged);
btnNavLogIn.addEventListener("click", checkIfLogged);
