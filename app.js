const heroSection = document.querySelector("#hero");
const btnLogin = document.querySelector("#btn-logIn");
const btnRegister = document.querySelector("#btn-Register");
const swtich = document.querySelector(".txt-switch");
const logOrRegDiv = document.querySelector("#loginOrReg");
const btnLogOut = document.querySelector("#btn-logout");
const btnDelete = document.querySelector("#btn-Delete");
const btnNavLogIn = document.querySelector("#nav-btn-logIn");
const btnNavRegister = document.querySelector("#nav-btn-register");

const inputUserName = document.querySelector("#inputUserName");
const inputUserPassword = document.querySelector("#inputPasswordLogin");

const accountSection = document.querySelector("#accountSection");
const nameDisplay = document.querySelector("#name-display");
const balanceDisplay = document.querySelector("#balance-display");
const tableBody = document.querySelector("#table-body");

const inputDeposit = document.querySelector("#input-deposit");
const inputWithdraw = document.querySelector("#input-withdraw");
const inputTransfer = document.querySelector("#input-transfer");
const inputTransferUserName = document.querySelector(
  "#input-transfer-user-name"
);

//--------------------------------END OF INITIALIZATION FOR DOM ELEMENTS--------------------------------
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
  transections: [945, 12354, 77895, 100, -4586, 24, -49894],
};
const thamaga = {
  userName: "thamaga04",
  password: "4444",
  transections: [96, 548, 344, 97, -98, 976, 365],
};
let arrUser = [john, thabo, khutso, thamaga];
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
function logOutFunction() {
  loginLogOut();
  location.reload();
}
//-----------------------------------------------------
function checkIfLogged() {
  if (heroSection.classList.contains("hidden")) {
    alert("You Have Logged In Already. Try To Log Out First");
  } else {
    logOutFunction();
  }
}
//---------------------Funct------------------------
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
          .slice(0, arrUser[i].userName.length - 2)}` //change it so it can also work for 100+
      );
      loginLogOut();
      tableBody.innerHTML = "";
      nameDisplay.textContent = arrUser[i].userName.toUpperCase();
      for (let count = 0; count < arrUser[i].transections.length; count++) {
        sum += arrUser[i].transections[count];

        if (arrUser[i].transections[count] > 0) {
          type = "Deposit";
          color = "success";
        } else {
          type = "Withdraw";
          color = "danger";
        }
        html = `<tr>
        <th scope="row">(${count + 1})</th>
        <td>${arrUser[i].transections[count]}</td>
        <td class='text-${color}'>${type}</td>
        <td>####</td>
        </tr>`;

        tableBody.insertAdjacentHTML("afterbegin", html);
      }

      balanceDisplay.textContent = `Balance: R${sum}`;
      break;
    } else if (i == arrUser.length - 1) {
      alert("Incorrect Password Or Username");
    }
  }
  console.log(inputUserName.value);
}

//-----------------------------------------------------
function switchOption() {
  if (btnLogin.classList.contains("hidden")) {
    btnLogin.classList.remove("hidden");
    btnRegister.classList.add("hidden");

    logOrRegDiv.classList.add("loginDiv");
    logOrRegDiv.classList.remove("registerDiv");
    swtich.textContent = "Register";
  } else {
    btnLogin.classList.add("hidden");
    btnRegister.classList.remove("hidden");
    logOrRegDiv.classList.remove("loginDiv");
    logOrRegDiv.classList.add("registerDiv");
    swtich.textContent = "Log In";
  }
}

//-----------------------------------------------------

swtich.addEventListener("click", switchOption);
btnLogin.addEventListener("click", loginFunction);

btnNavRegister.addEventListener("click", checkIfLogged);
btnNavLogIn.addEventListener("click", checkIfLogged);
btnLogOut.addEventListener("click", logOutFunction);
