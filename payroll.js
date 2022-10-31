'use strict';
const UriageInput = document.getElementById('uriage');
const KeihiInput = document.getElementById('keihi');
const RiekiOutput = document.getElementById('rieki');

const toribunnInput = document.getElementById('toribunn');
const touzituAllOutput = document.getElementById('touzitu_toribunn');
const zyunnbiAllOutput = document.getElementById('zyunnbi_toribunn');

const CalcButton = document.getElementById('calc');

CalcButton.onclick = () => {
  RiekiOutput.innerText = UriageInput.value - KeihiInput.value;

  touzituAllOutput.innerText = Math.round(RiekiOutput.innerText * toribunnInput.value / 100);
  zyunnbiAllOutput.innerText = RiekiOutput.innerText - touzituAllOutput.innerText;

  if (Member.length > 1) {
    Edit_MembersTableButton.onclick();
    payroll();
  }
}


const MemberName = document.getElementById('membername');
const AddmemberButton = document.getElementById('addmember');

const Member = [{ id: 0, name: 'example', Working_hours: 0, income_touzitu: 0, income_zyunnbi: 0, income: 0 }];

const MembersTable = document.getElementById('memberstable');



AddmemberButton.onclick = () => {
  if (MemberName.value != '') {
    Member.push({ id: Member.length, name: `${MemberName.value}`, Working_hours: 0, income_touzitu: 0, income_zyunnbi: 0, income: 0 });

    const tr_element = document.createElement('tr');
    tr_element.id = `id${(Member.length - 1)}`;

    const td_element_id = document.createElement('td');
    const td_element_name = document.createElement('td');
    const td_element_hours = document.createElement('td');
    const td_element_income_touzitu = document.createElement('td');
    const td_element_income_zyunnbi = document.createElement('td');
    const td_element_income = document.createElement('td');

    td_element_id.innerText = Member.length - 1;
    td_element_name.innerText = `${MemberName.value}`;
    td_element_hours.innerText = 0;
    td_element_income_touzitu.innerText = 0;
    td_element_income_zyunnbi.innerText = 0;
    td_element_income.innerText = 0;

    td_element_id.id = `id${Member.length - 1}_id`;
    td_element_name.id = `id${Member.length - 1}_name`;
    td_element_hours.id = `id${Member.length - 1}_hours`;
    td_element_income_touzitu.id = `id${Member.length - 1}_income_touzitu`;
    td_element_income_zyunnbi.id = `id${Member.length - 1}_income_zyunnbi`;
    td_element_income.id = `id${Member.length - 1}_income`;

    tr_element.appendChild(td_element_id)
    tr_element.appendChild(td_element_name)
    tr_element.appendChild(td_element_hours)
    tr_element.appendChild(td_element_income_touzitu)
    tr_element.appendChild(td_element_income_zyunnbi)
    tr_element.appendChild(td_element_income)

    MembersTable.appendChild(tr_element);

    MemberName.value = ''
  }
}


const Edit_MembersTableButton = document.getElementById('edit_memberstable');
const Save_MembersTableButton = document.getElementById('save_memberstable');

Edit_MembersTableButton.style.visibility = 'visible'
Save_MembersTableButton.style.visibility = 'hidden'

const Editing_Table = document.getElementById('editing_table');
let editing = false;
const MembersTable_template_th = '<tr><th>id</th><th>メンバー名</th><th>勤務合計時間</th><th>当日分給与</th><th>準備分給与</th><th>給与</th><th>準備参加者</th></tr>'
Edit_MembersTableButton.onclick = () => {
  if (!editing) {
    Editing_Table.border = 1;
    Editing_Table.insertAdjacentHTML('beforeend', MembersTable_template_th);
    for (let i = 1; i < Member.length; i++) {
      const tr_element = document.createElement('tr');
      tr_element.id = `edit_id_${(i)}`;

      const edit_td_element_id = document.createElement('td');
      const edit_td_element_name = document.createElement('td');
      const edit_td_element_hours = document.createElement('td');
      const edit_td_element_income_touzitu = document.createElement('td');
      const edit_td_element_income_zyunnbi = document.createElement('td');
      const edit_td_element_income = document.createElement('td');
      const edit_td_element_checkbox = document.createElement('td');

      const edit_input_element_name = document.createElement('input');
      const edit_input_element_hours = document.createElement('input');
      const edit_input_element_income_touzitu = document.createElement('input');
      const edit_input_element_income_zyunnbi = document.createElement('input');
      const edit_input_element_income = document.createElement('input');
      const edit_input_element_checkbox = document.createElement('input');

      edit_input_element_name.type = "text";
      edit_input_element_hours.type = "text";
      edit_input_element_income_touzitu.type = "text";
      edit_input_element_income_zyunnbi.type = "text";
      edit_input_element_income.type = "text";
      edit_input_element_checkbox.type = "checkbox";

      edit_input_element_hours.onchange = payroll;
      edit_input_element_checkbox.onchange = payroll;

      edit_input_element_name.id = `edit_id_${(i)}_name`;
      edit_input_element_hours.id = `edit_id_${(i)}_hours`;
      edit_input_element_income_touzitu.id = `edit_id_${(i)}_income_touzitu`
      edit_input_element_income_zyunnbi.id = `edit_id_${(i)}_income_zyunnbi`
      edit_input_element_income.id = `edit_id_${(i)}_income`;
      edit_input_element_checkbox.id = `edit_id_${(i)}_checkbox`

      edit_input_element_name.value = document.getElementById(`id${i}_name`).innerText;
      edit_input_element_hours.value = document.getElementById(`id${i}_hours`).innerText;
      edit_input_element_income_touzitu.value = document.getElementById(`id${i}_income_touzitu`).innerText;
      edit_input_element_income_zyunnbi.value = document.getElementById(`id${i}_income_zyunnbi`).innerText;
      edit_input_element_income.value = document.getElementById(`id${i}_income`).innerText;

      edit_td_element_id.innerText = document.getElementById(`id${i}_id`).innerText;
      edit_td_element_name.appendChild(edit_input_element_name);
      edit_td_element_hours.appendChild(edit_input_element_hours);
      edit_td_element_income_touzitu.appendChild(edit_input_element_income_touzitu);
      edit_td_element_income_zyunnbi.appendChild(edit_input_element_income_zyunnbi);
      edit_td_element_income.appendChild(edit_input_element_income);
      edit_td_element_checkbox.appendChild(edit_input_element_checkbox);

      tr_element.appendChild(edit_td_element_id);
      tr_element.appendChild(edit_td_element_name);
      tr_element.appendChild(edit_td_element_hours);
      tr_element.appendChild(edit_td_element_income_touzitu);
      tr_element.appendChild(edit_td_element_income_zyunnbi);
      tr_element.appendChild(edit_td_element_income);
      tr_element.appendChild(edit_td_element_checkbox);

      Editing_Table.appendChild(tr_element);
    }

    payroll();

    Edit_MembersTableButton.style.visibility = 'hidden';
    Save_MembersTableButton.style.visibility = 'visible';
    AddmemberButton.style.visibility = 'hidden';
    editing = true;
  }
}

let AutoCalcCheckBox = document.getElementById('autocalc');
const AutoCalcText = document.getElementById('autocalctext');
let AutoCalc = true;

AutoCalcCheckBox.onchange = () => {
  if (AutoCalcCheckBox.checked) {
    AutoCalc = true;
    AutoCalcText.innerText = '自動計算をオフにする'
  }
  else if (!AutoCalcCheckBox.checked) {
    AutoCalc = false;
    AutoCalcText.innerText = '自動計算をオンにする'
  }
}

function payroll() {
  if (AutoCalc) {
    TouzituPayroll();
    ZyunnbiPayroll();
    for (let i = 1; i < Member.length; i++) {
      document.getElementById(`edit_id_${i}_income`).value = Number(document.getElementById(`edit_id_${i}_income_touzitu`).value ) + Number(document.getElementById(`edit_id_${i}_income_zyunnbi`).value);
    }
  }
}

function TouzituPayroll() {
  if (AutoCalc) {
    let hourlywage = touzituAllOutput.innerText / TotalTime();
    for (let i = 1; i < Member.length; i++) {
      if (document.getElementById(`edit_id_${i}_hours`).value != 0) {
        document.getElementById(`edit_id_${i}_income_touzitu`).value = hourlywage * document.getElementById(`edit_id_${i}_hours`).value;
      }
    }
  }
}

function ZyunnbiPayroll() {
  if (AutoCalc) {
    let salary_zyunnbi = zyunnbiAllOutput.innerText / ZyunnbiSannkasya();
    for (let i = 1; i < Member.length; i++) {
      if (document.getElementById(`edit_id_${i}_checkbox`).checked == true) {
        document.getElementById(`edit_id_${i}_income_zyunnbi`).value = salary_zyunnbi;
      } else {
        document.getElementById(`edit_id_${i}_income_zyunnbi`).value = 0;
      }
    }
  }
}

function ZyunnbiSannkasya(zyunnbisannkasya = 0) {
  for (let i = 1; i < Member.length; i++) {
    if (document.getElementById(`edit_id_${(i)}_checkbox`).checked == true) {
      zyunnbisannkasya++;
    }
  }
  return zyunnbisannkasya;
}

function TotalTime(totaltime = 0) {

  for (let i = 1; i < Member.length; i++) {
    totaltime = totaltime + Number(document.getElementById(`edit_id_${i}_hours`).value);
  }
  console.log(totaltime);
  return totaltime;
}

Save_MembersTableButton.onclick = () => {
  Editing_Table.firstElementChild.remove();

  for (let i = 1; i < Member.length; i++) {
    Save_MembersTable(i);
    Editing_Table.firstElementChild.remove();
  }
  Edit_MembersTableButton.style.visibility = 'visible';
  Save_MembersTableButton.style.visibility = 'hidden';
  AddmemberButton.style.visibility = 'visible';
  Editing_Table.border = 0;
  editing = false;
}
function Save_MembersTable(memberid) {
  Member[memberid].name = document.getElementById(`edit_id_${memberid}_name`).value;
  Member[memberid].Working_hours = document.getElementById(`edit_id_${memberid}_hours`).value;
  Member[memberid].income_touzitu = document.getElementById(`edit_id_${memberid}_income_touzitu`).value;
  Member[memberid].income_zyunnbi = document.getElementById(`edit_id_${memberid}_income_zyunnbi`).value;
  Member[memberid].income = document.getElementById(`edit_id_${memberid}_income`).value;

  document.getElementById(`id${memberid}_name`).innerText = Member[memberid].name;
  document.getElementById(`id${memberid}_hours`).innerText = Member[memberid].Working_hours;
  document.getElementById(`id${memberid}_income_touzitu`).innerText = Member[memberid].income_touzitu;
  document.getElementById(`id${memberid}_income_zyunnbi`).innerText = Member[memberid].income_zyunnbi;
  document.getElementById(`id${memberid}_income`).innerText = Member[memberid].income;
}