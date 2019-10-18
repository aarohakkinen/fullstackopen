(window.webpackJsonpphonebook=window.webpackJsonpphonebook||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},36:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),u=t(13),c=t.n(u),o=t(2),i=function(e){var n=e.handleFilterChange;return r.a.createElement("div",null,"filter shown with ",r.a.createElement("input",{onChange:n}))},l=function(e){var n=e.addPerson,t=e.newName,a=e.handleNameChange,u=e.newNumber,c=e.handleNumberChange;return r.a.createElement("form",{onSubmit:n},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:t,onChange:a})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:u,onChange:c})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},m=function(e){var n=e.successMessage,t=e.errorMessage;return null!==n?r.a.createElement("div",{className:"success"},n):null!==t?r.a.createElement("div",{className:"error"},t):null},s=function(e){var n=e.filteredPersons,t=e.removePerson;return n.map((function(e){return r.a.createElement("div",{key:e.name},e.name," ",e.number,r.a.createElement("button",{onClick:function(){return t(e)}},"delete"))}))},f=t(3),d=t.n(f),h="/api/persons",b=function(){return d.a.get(h).then((function(e){return e.data}))},v=function(e){return d.a.post(h,e).then((function(e){return e.data}))},E=function(e){return d.a.delete("".concat(h,"/").concat(e.id)).then((function(e){return e.data}))},p=function(e){return d.a.put("".concat(h,"/").concat(e.id),e).then((function(e){return e.data}))},g=(t(36),function(){var e=Object(a.useState)(""),n=Object(o.a)(e,2),t=n[0],u=n[1],c=Object(a.useState)([]),f=Object(o.a)(c,2),d=f[0],h=f[1],g=Object(a.useState)([]),w=Object(o.a)(g,2),j=w[0],O=w[1],N=Object(a.useState)(""),C=Object(o.a)(N,2),y=C[0],k=C[1],S=Object(a.useState)(""),P=Object(o.a)(S,2),x=P[0],T=P[1],I=Object(a.useState)(null),M=Object(o.a)(I,2),R=M[0],D=M[1],F=Object(a.useState)(null),J=Object(o.a)(F,2),A=J[0],B=J[1];Object(a.useEffect)((function(){b().then((function(e){h(e),O(e)}))}),[]);return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(m,{successMessage:R,errorMessage:A}),r.a.createElement(i,{handleFilterChange:function(e){u(e.target.value),O(d.filter((function(n){return new RegExp(e.target.value,"i").test(n.name)})))}}),r.a.createElement("h2",null,"Add a new"),r.a.createElement(l,{addPerson:function(e){e.preventDefault();var n={name:y,number:x},a=d.findIndex((function(e){return e.name===n.name}));-1!==a&&window.confirm(n.name+" is already added to phonebook, replace the old number with a new one?")?(n.id=d[a].id,p(n).then((function(){h(d.splice(a,1,n)),new RegExp(t,"i").test(n.name)&&O(d.filter((function(e){return new RegExp(t,"i").test(e.name)}))),k(""),T(""),D("".concat(n.name," has been successfully updated")),setTimeout((function(){return D(null)}),5e3)})).catch((function(){h(d.filter((function(e){return e.id!==n.id}))),O(j.filter((function(e){return e.id!==n.id}))),B("Information of ".concat(n.name," has already been removed from server")),setTimeout((function(){return B(null)}),5e3)}))):v(n).then((function(e){h(d.concat(e)),new RegExp(t,"i").test(e.name)&&O(j.concat(e)),k(""),T(""),D("".concat(n.name," has been successfully added")),setTimeout((function(){return D(null)}),5e3)}))},newName:y,handleNameChange:function(e){k(e.target.value)},newNumber:x,handleNumberChange:function(e){T(e.target.value)}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(s,{filteredPersons:j,removePerson:function(e){window.confirm("Delete "+e.name+"?")&&(E(e).then((function(){D("".concat(e.name," has been successfully removed")),setTimeout((function(){return D(null)}),5e3)})).catch((function(){B("Information of ".concat(e.name," has already been removed from server")),setTimeout((function(){return B(null)}),5e3)})),h(d.filter((function(n){return n.id!==e.id}))),O(j.filter((function(n){return n.id!==e.id}))))}}))});c.a.render(r.a.createElement(g,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.43db27ac.chunk.js.map