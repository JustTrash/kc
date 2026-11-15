const slides = [...document.querySelectorAll('.hero-slide')];
const dots = document.querySelector('.dots');
const indexEl = document.querySelector('.hero-index span');
let current = 0;
let timer;

slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.type = 'button';
  dot.setAttribute('aria-label', `切换到第 ${i + 1} 张`);
  dot.addEventListener('click', () => showSlide(i));
  dots.appendChild(dot);
});

function showSlide(next) {
  current = (next + slides.length) % slides.length;
  slides.forEach((slide, i) => slide.classList.toggle('active', i === current));
  [...dots.children].forEach((dot, i) => dot.classList.toggle('active', i === current));
  indexEl.textContent = String(current + 1).padStart(2, '0');
  clearInterval(timer);
  timer = setInterval(() => showSlide(current + 1), 6500);
}
document.querySelector('.prev').addEventListener('click', () => showSlide(current - 1));
document.querySelector('.next').addEventListener('click', () => showSlide(current + 1));
showSlide(0);

const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
menu.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  nav.classList.toggle('open', open);
  menu.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menu.classList.remove('open'); nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false');
}));

document.querySelectorAll('.filter-tabs button').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter-tabs button').forEach(b => b.classList.remove('active'));
    button.classList.add('active');
    document.querySelectorAll('.project-card').forEach(card => {
      card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
    });
  });
});

const detailModal = document.querySelector('.detail-modal');
const detailTitle = detailModal.querySelector('#detail-modal-title');
const detailBody = detailModal.querySelector('.project-detail-body');
const detailScroll = detailModal.querySelector('.project-detail-scroll');
const detailClose = detailModal.querySelector('.detail-toolbar button');
let detailTrigger = null;

const projectDetails = {
  talent: {
    title: '香港高端人才通行证计划（TTPS）',
    content: `<p>高才通计划旨在吸引世界各地具备丰富工作经验及高学历的高端人才到香港探索机遇。这些高端人才包括高收入人士和世界顶尖大学的毕业生。</p><h3>申请条件</h3><div class="condition-block"><b>A 类</b><p>申请前一年全年收入达港币 250 万元或以上（或等值外币），需提供相应的收入证明文件。</p></div><div class="condition-block"><b>B 类</b><p>获合资格大学颁授学士学位，并在过去 5 年内累积至少 3 年工作经验。</p></div><div class="condition-block"><b>C 类</b><p>获合资格大学颁授学士学位，工作经验少于 3 年，但毕业时间不超过 5 年。每年限额 10,000 名，先到先得。</p></div>`
  },
  quality: {
    title: '香港优秀人才入境计划（QMA）',
    content: `<p>本计划旨在吸引高技术人才或优才来港定居，借以提升香港的经济竞争力。申请人无须在申请或获准来港定居前先获得本地雇主聘任。</p><h3>申请条件</h3><p>申请人可选择以“综合计分制”或“成就计分制”接受评核。综合计分制设有 12 项评核准则，满足其中 6 项即可申请。</p><ol><li>年龄 50 岁或以下。</li><li>持有优才计划合资格大学的硕士或博士学位。</li><li>持有合资格大学 STEM 学科（科学、科技、工程、数学类专业）的硕士或博士学位。</li><li>具备两种语言的良好书写及口语能力。</li><li>具备良好的英语书写及口语能力。</li><li>拥有 5 年或以上符合学位程度的工作经验。</li><li>拥有 3 年或以上跨国公司或知名企业工作经验。</li><li>拥有 3 年或以上创新科技、金融、国际贸易行业工作经验。</li><li>拥有 2 年或以上国际工作经验。</li><li>申请前 12 个月收入达到 100 万港元或以上。</li><li>拥有年盈利 500 万港元以上公司的控制权（上市公司 10% 或以上，非上市公司 50% 或以上）。</li><li>拥有一家上市公司 10% 或以上的股权。</li></ol><h3>成就计分制</h3><ul><li>申请人曾获得杰出成就奖，例如奥运奖牌、诺贝尔奖、国家或国际奖项。</li><li>申请人可证明其工作得到同业肯定，或对其界别发展有重大贡献，例如获得有关行业的终生成就奖。</li></ul>`
  },
  professional: {
    title: '香港输入内地人才计划（专才 ASMTP）',
    content: `<p>具备香港特区所需而又缺乏的特别技能、知识或经验的内地中国居民，可根据输入内地人才计划申请来港工作。本计划并无配额限制，亦不限行业。</p><h3>内地申请人条件</h3><ul><li>取得由认可大学或机构颁发的毕业证、学位证或专业资格证，并且无犯罪记录及不良入境记录。</li><li>已获得香港公司聘用，且岗位与其学历或工作经验有关。</li></ul><h3>香港雇主公司条件</h3><ul><li><b>成立时间：</b>至少一年以上。</li><li><b>实质运营：</b>拥有香港本地办公地址；不少于 3 名本地员工并提供时长不低于 6 个月的强积金缴纳证明；具有实质经营活动并依法纳税。</li><li><b>职位空缺：</b>需证明该职务确有空缺，且在香港难以找到合适人选。</li></ul>`
  },
  investment: {
    title: '香港新资本投资者入境计划（CIES）',
    content: `<p>新计划旨在进一步丰富人才库及吸引更多新资金落户香港，以增强香港资产及财富管理、金融及相关专业服务界别的发展优势。</p><h3>申请条件</h3><ul><li>年满 18 岁。</li><li><b>适用对象：</b>外国国民、已获外国永久居民身份的中国籍人士、澳门居民及台湾居民。</li><li>申请前 6 个月持续实益拥有不少于 3,000 万港元（或等值外币）净资产，包括共有资产中属于申请人的份额。</li><li>投资不少于 3,000 万港元于获许投资资产。</li><li>无不良入境记录，符合一般入境及保安规定。</li><li>能够供养受养人，不依赖在港投资、工作或公共援助；受养人入境另按当时政策办理。</li></ul>`
  },
  study: {
    title: '香港留学进修',
    content: `<p>全称“非本地毕业生留港／回港就业”。申请人在香港修读一年全日制硕士课程，留学期间可申请学生签证在港居留，毕业后可申请香港 IANG 签证，满 7 年可申请香港永久居民身份。</p><h3>申请条件</h3><ul><li><b>年龄：</b>无限制。</li><li><b>学历：</b>大专及以上。</li><li><b>语言：</b>具备英语能力或相关证明。</li><li><b>品格：</b>无犯罪记录及不良入境记录。</li></ul><h3>申请周期</h3><p>申请时间与大学入学时间相关。毕业后找到工作后，申请 IANG 签证的周期一般为 3 至 6 个月。</p><h3>适合人群</h3><ul><li>希望提升学历和职业发展的青年。</li><li>希望为子女教育铺路的“双非”父母。</li><li>希望拓展事业的企业家与专业人士。</li><li>英语或学历背景相对普通者。</li><li>希望以较低成本规划香港身份的家庭。</li></ul>`
  },
  renewal: {
    title: '香港身份续签服务',
    content: `<p>香港身份证分为“香港永久性居民身份证”及“香港居民身份证”。香港永久性居民身份证由入境处签发给拥有香港居留权的人士；香港居民身份证则签发给尚未拥有香港居留权的人士。</p><p>持有香港居民身份证并连续续签 7 年以上，可申请香港永久居民身份。港恒可围绕续签材料、时间节点及长期身份衔接提供持续支持。</p><div class="detail-note"><b>温馨提示</b><p>即使最初的身份申请业务并非由港恒办理，我们也可以协助提供续签服务。</p></div>`
  }
};

function openDetail(card) {
  const project = projectDetails[card.dataset.projectId];
  if (!project) return;
  detailTrigger = card;
  detailTitle.textContent = project.title;
  detailBody.innerHTML = project.content;
  detailModal.hidden = false;
  document.body.classList.add('modal-open');
  detailScroll.scrollTop = 0;
  detailClose.focus();
}

function closeDetail() {
  if (detailModal.hidden) return;
  detailModal.hidden = true;
  document.body.classList.remove('modal-open');
  detailBody.innerHTML = '';
  detailTrigger?.focus();
}

document.querySelectorAll('[data-project-id]').forEach(card => {
  card.addEventListener('click', () => openDetail(card));
  card.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openDetail(card);
    }
  });
});
detailModal.querySelectorAll('[data-close-detail]').forEach(button => button.addEventListener('click', closeDetail));

const qrModal = document.querySelector('.qr-modal');
const qrClose = qrModal.querySelector('.qr-modal-close');
let qrTrigger = null;

function openQr(event) {
  qrTrigger = event.currentTarget;
  qrModal.hidden = false;
  document.body.classList.add('modal-open');
  qrClose.focus();
}

function closeQr() {
  if (qrModal.hidden) return;
  qrModal.hidden = true;
  if (detailModal.hidden) document.body.classList.remove('modal-open');
  qrTrigger?.focus();
}

document.querySelectorAll('[data-qr-open]').forEach(button => button.addEventListener('click', openQr));
qrModal.querySelectorAll('[data-qr-close]').forEach(button => button.addEventListener('click', closeQr));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    if (!qrModal.hidden) closeQr();
    else closeDetail();
  }
});

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) entry.target.classList.add('revealed');
}), { threshold: .12 });
document.querySelectorAll('section:not(.hero), .project-card').forEach(el => { el.classList.add('reveal'); observer.observe(el); });
