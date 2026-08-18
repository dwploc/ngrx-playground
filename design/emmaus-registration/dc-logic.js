class Component extends DCLogic {
  state = {
    step: 1,
    submitted: false,
    showErr: false,
    walk: 'men',
    diet: { veg: true, vegan: false, gluten: true, dairy: false, nut: false, other: false },
    cpap: false,
    scholarship: false,
    needSponsor: false,
    agree: true,
    f: {
      name: 'Michael Ellis Reyna',
      goesby: 'Mike',
      dob: '',
      email: 'mreyna@example.com',
      phone: '[000] 000-0000',
      street: '1418 Kings Lake Drive',
      city: 'Kingwood',
      state: 'TX',
      zip: '77345',
      church: 'Strawbridge United Methodist Church',
      churchcity: 'Kingwood',
      pastor: 'Rev. Dr. Todd Jordan',
      tenure: 'More than five years',
      sponsor: 'Dana Whitfield',
      sponsorphone: '[000] 000-0000',
      sponsoremail: 'dana.whitfield@example.com',
      sponsorwalk: 'Yes',
      dietnote: 'Celiac, so cross-contamination matters more than the menu does.',
      health: '',
      sleeping: 'Lower bunk, please',
      econtact: 'Angela Reyna',
      erel: 'Wife',
      ephone: '[000] 000-0000'
    }
  };

  componentDidMount() { this.applyView(this.props.view); }

  componentDidUpdate(prev) {
    if (prev && prev.view !== this.props.view) this.applyView(this.props.view);
  }

  // The "Prototype view" tweak jumps the form to a state without clicking through it.
  applyView(v) {
    var t = String(v == null ? '' : v);
    var s = { showErr: false, submitted: false };
    if (t.indexOf('Submitted') === 0) { s.step = 4; s.submitted = true; }
    else if (t.indexOf('missing') > -1) {
      s.step = 1; s.showErr = true;
      s.f = Object.assign({}, this.state.f, { phone: '' });
    }
    else if (t.indexOf('Step 2') === 0) { s.step = 2; }
    else if (t.indexOf('Step 3') === 0) { s.step = 3; }
    else if (t.indexOf('Step 4') === 0) { s.step = 4; }
    else { s.step = 1; }
    this.setState(s);
  }

  blank(k) { return !String(this.state.f[k] || '').trim(); }

  setField(k) {
    var self = this;
    return function (e) {
      var v = e && e.target ? e.target.value : '';
      var f = Object.assign({}, self.state.f);
      f[k] = v;
      self.setState({ f: f });
    };
  }

  goto(n) { var self = this; return function () { self.setState({ step: n, submitted: false }); }; }

  next() {
    if (this.state.step === 1 && (this.blank('name') || this.blank('email') || this.blank('phone'))) {
      this.setState({ showErr: true });
      return;
    }
    this.setState({ step: Math.min(4, this.state.step + 1), showErr: false });
  }

  back() { this.setState({ step: Math.max(1, this.state.step - 1), showErr: false }); }

  flip(k) { var self = this; return function () { var s = {}; s[k] = !self.state[k]; self.setState(s); }; }

  flipDiet(k) {
    var self = this;
    return function () {
      var d = Object.assign({}, self.state.diet);
      d[k] = !d[k];
      self.setState({ diet: d });
    };
  }

  chipCls(n) {
    if (this.state.step === n) return 'chip active';
    return this.state.step > n ? 'chip done' : 'chip';
  }

  dietLabel() {
    var d = this.state.diet;
    var out = [];
    if (d.veg) out.push('Vegetarian');
    if (d.vegan) out.push('vegan');
    if (d.gluten) out.push('gluten free');
    if (d.dairy) out.push('dairy free');
    if (d.nut) out.push('nut allergy');
    if (d.other) out.push('something else');
    if (!out.length) return 'Nothing to flag';
    return out.join(', ');
  }

  renderVals() {
    var self = this;
    var st = this.state;
    var f = st.f;
    var err = st.showErr;
    var nameBad = err && this.blank('name');
    var emailBad = err && this.blank('email');
    var phoneBad = err && this.blank('phone');
    var walkName = st.walk === 'men' ? "Men's Walk" : "Women's Walk";
    var home = [f.street, f.city, f.state, f.zip].filter(Boolean).join(', ').replace(', ' + f.zip, ' ' + f.zip);
    var first = String(f.goesby || f.name || '').split(' ')[0];

    return {
      f: f,

      // which panel is on screen
      showForm: !st.submitted,
      submitted: st.submitted,
      is1: !st.submitted && st.step === 1,
      is2: !st.submitted && st.step === 2,
      is3: !st.submitted && st.step === 3,
      is4: !st.submitted && st.step === 4,

      // step chips
      c1: this.chipCls(1), c2: this.chipCls(2), c3: this.chipCls(3), c4: this.chipCls(4),
      d1: st.step > 1, d2: st.step > 2, d3: st.step > 3,
      go1: this.goto(1), go2: this.goto(2), go3: this.goto(3), go4: this.goto(4),
      next: function () { self.next(); },
      back: function () { self.back(); },
      submit: function () { self.setState({ submitted: true }); },
      reset: function () { self.setState({ submitted: false, step: 1, showErr: false }); },

      // weekend picker
      menOn: st.walk === 'men',
      womenOn: st.walk === 'women',
      menCls: st.walk === 'men' ? 'pick on' : 'pick',
      womenCls: st.walk === 'women' ? 'pick on' : 'pick',
      pickMen: function () { self.setState({ walk: 'men' }); },
      pickWomen: function () { self.setState({ walk: 'women' }); },

      // step 1 fields
      setName: this.setField('name'),
      setGoesby: this.setField('goesby'),
      setDob: this.setField('dob'),
      setEmail: this.setField('email'),
      setPhone: this.setField('phone'),
      setStreet: this.setField('street'),
      setCity: this.setField('city'),
      setState: this.setField('state'),
      setZip: this.setField('zip'),
      nameBad: nameBad, emailBad: emailBad, phoneBad: phoneBad,
      nameCls: nameBad ? 'field span2 err' : 'field span2',
      emailCls: emailBad ? 'field err' : 'field',
      phoneCls: phoneBad ? 'field err' : 'field',

      // step 2 fields
      setChurch: this.setField('church'),
      setChurchcity: this.setField('churchcity'),
      setPastor: this.setField('pastor'),
      setTenure: this.setField('tenure'),
      setSponsor: this.setField('sponsor'),
      setSponsorphone: this.setField('sponsorphone'),
      setSponsoremail: this.setField('sponsoremail'),
      setSponsorwalk: this.setField('sponsorwalk'),
      needSponsor: st.needSponsor,
      sponsorNeedCls: st.needSponsor ? 'check on' : 'check',
      toggleSponsorNeed: this.flip('needSponsor'),

      // step 3 fields
      dVegCls: st.diet.veg ? 'tog on' : 'tog',
      dVeganCls: st.diet.vegan ? 'tog on' : 'tog',
      dGlutenCls: st.diet.gluten ? 'tog on' : 'tog',
      dDairyCls: st.diet.dairy ? 'tog on' : 'tog',
      dNutCls: st.diet.nut ? 'tog on' : 'tog',
      dOtherCls: st.diet.other ? 'tog on' : 'tog',
      dVeg: this.flipDiet('veg'),
      dVegan: this.flipDiet('vegan'),
      dGluten: this.flipDiet('gluten'),
      dDairy: this.flipDiet('dairy'),
      dNut: this.flipDiet('nut'),
      dOther: this.flipDiet('other'),
      setDietnote: this.setField('dietnote'),
      setHealth: this.setField('health'),
      setSleeping: this.setField('sleeping'),
      setEcontact: this.setField('econtact'),
      setErel: this.setField('erel'),
      setEphone: this.setField('ephone'),
      cpap: st.cpap,
      cpapCls: st.cpap ? 'check on' : 'check',
      toggleCpap: this.flip('cpap'),
      scholarship: st.scholarship,
      scholarCls: st.scholarship ? 'check on' : 'check',
      toggleScholar: this.flip('scholarship'),

      // step 4 review
      agree: st.agree,
      agreeCls: st.agree ? 'check on' : 'check',
      toggleAgree: this.flip('agree'),
      rWeekend: walkName + ' · [THU DATE – SUN DATE]',
      rName: f.name || '—',
      rNameAlt: f.goesby ? '— goes by ' + f.goesby : '',
      rEmail: f.email || '—',
      rPhone: f.phone || '—',
      rHome: home || '—',
      rChurch: [f.church, f.churchcity].filter(Boolean).join(', ') || '—',
      rPastor: f.pastor || '—',
      rSponsor: st.needSponsor ? 'To be matched by [COMMUNITY]' : (f.sponsor || '—'),
      rSponsorAlt: st.needSponsor ? '— none yet' : (f.sponsorwalk === 'Yes' ? '— has made a Walk' : ''),
      rSponsorContact: [f.sponsorphone, f.sponsoremail].filter(Boolean).join(' · ') || '—',
      rDiet: this.dietLabel(),
      rDietAlt: f.dietnote ? '— ' + f.dietnote : '',
      rHealth: f.health || '',
      rHealthAlt: f.health ? '' : 'None given',
      rSleep: f.sleeping + (st.cpap ? ' · CPAP outlet needed' : ''),
      rEmergName: f.econtact || '—',
      rEmergRel: f.erel ? '— ' + String(f.erel).toLowerCase() : '',
      rEmergPhone: f.ephone ? '· ' + f.ephone : '',
      rSchol: st.scholarship ? 'Requested' : '',
      rScholAlt: st.scholarship ? '' : 'Not requested',

      // submitted
      successLede: 'Thank you, ' + (first || 'friend') + '. Your form is with the registrar for the ' + walkName + ', [THU DATE – SUN DATE].',
      successToday: 'A confirmation is on its way to ' + (f.email || 'your inbox') + '.' + (st.needSponsor ? ' [COMMUNITY] will call about a sponsor.' : ' Tell ' + String(f.sponsor || 'your sponsor').split(' ')[0] + ' you did it.')
    };
  }
}
