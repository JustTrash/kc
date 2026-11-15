const header = document.querySelector('.site-header');
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
const navLinks = [...document.querySelectorAll('.nav-links a[href^="#"]')];

const closeMenu = () => {
  nav?.classList.remove('open');
  toggle?.classList.remove('open');
  toggle?.setAttribute('aria-expanded', 'false');
};

toggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', String(open));
});

navLinks.forEach(link => link.addEventListener('click', closeMenu));

const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 24);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reducedMotion || !('IntersectionObserver' in window)) {
  document.querySelectorAll('.reveal').forEach(element => element.classList.add('show'));
} else {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('show');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -35px' });
  document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));
}

const sections = navLinks
  .map(link => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => link.classList.toggle('active', link.hash === `#${entry.target.id}`));
    });
  }, { rootMargin: '-35% 0px -58%', threshold: 0 });
  sections.forEach(section => sectionObserver.observe(section));
}

const filterButtons = document.querySelectorAll('.case-tabs button');
const caseCards = document.querySelectorAll('.case-card');
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach(item => {
      const selected = item === button;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    caseCards.forEach(card => {
      const hidden = filter !== 'all' && card.dataset.category !== filter;
      card.classList.toggle('hidden', hidden);
    });
  });
});

const projectFilters = document.querySelectorAll('.project-filter-tabs button');
const projectCards = document.querySelectorAll('.project-card[data-project-id]');
projectFilters.forEach(button => button.addEventListener('click', () => {
  projectFilters.forEach(item => {
    const active = item === button;
    item.classList.toggle('active', active);
    item.setAttribute('aria-pressed', String(active));
  });
  projectCards.forEach(card => {
    card.hidden = button.dataset.projectFilter !== 'all' && card.dataset.category !== button.dataset.projectFilter;
  });
}));

const projectDetails = {
  talent: {
    title: '香港高端人才通行证计划（TTPS）',
    content: `<p>面向具备较高收入、合资格大学学士学位及相应工作经历的申请人，分 A、B、C 类评估；申请时一般无须先取得香港聘用。</p><h3>适合人群</h3><p>高收入人士、合资格大学毕业并拥有工作经验的专业人士，以及符合毕业年限要求的合资格大学毕业生。</p><h3>申请要点</h3><p>A 类核对申请前一年的收入；B、C 类核对学位颁授院校、毕业时间与工作经历。获批后还应提前规划香港就业、创业及续签。</p><p><a href="https://www.immd.gov.hk/eng/services/visas/TTPS.html" target="_blank" rel="noopener noreferrer">查看入境处现行条件 ↗</a></p>`
  },
  quality: {
    title: '香港优秀人才入境计划（QMAS）',
    content: `<p>吸引高技术人才或优秀人才来港，申请前无须取得香港雇主聘用；需按基本资格和所选评核机制接受甄选。</p><h3>适合人群</h3><p>在学历、语言、专业经历、行业背景或杰出成就方面具有竞争力，并计划来港发展的申请人。</p><h3>申请要点</h3><p>先核对基本资格，再比较综合计分制与成就计分制；综合评核涉及年龄、学历、语言、工作经验、收入及业务拥有权等方面。达到申请门槛不等于保证获批。</p><p><a href="https://www.immd.gov.hk/eng/services/visas/quality_migrant_admission_scheme.html" target="_blank" rel="noopener noreferrer">查看入境处现行条件 ↗</a></p>`
  },
  professional: {
    title: '香港输入内地人才计划（ASMTP）',
    content: `<p>供符合条件的内地专业人士受聘来港工作。计划不设配额及行业限制，但须评估职位、申请人背景和香港雇主的实际聘用安排。</p><h3>适合人群</h3><p>已获香港雇主聘用，具备与拟聘职位相关的学历、专业能力或工作经验的内地居民。</p><h3>申请要点</h3><p>真实职位与人岗匹配、薪酬是否符合市场水平、雇主业务情况及当地人才供应等；雇主条件应按官方规则和实际经营情况评估，不应套用统一的成立年限或员工人数。</p><p><a href="https://www.immd.gov.hk/eng/services/visas/ASMTP.html" target="_blank" rel="noopener noreferrer">查看入境处现行条件 ↗</a></p>`
  },
  investment: {
    title: '香港新资本投资者入境计划（CIES）',
    content: `<p>通过符合计划规定的资产及投资安排，评估合资格人士来港发展的路径；投资决定和身份申请都应独立审慎考虑。</p><h3>适合人群</h3><p>符合计划适用身份范围、净资产及合资格投资要求，并希望统筹家庭和财富安排的人士。</p><h3>申请要点</h3><p>申请人身份、资产持有及评估期、获许投资资产、持续合规与家属安排。计划规则可调整，投资亦有风险，网页不作收益或获批承诺。</p><p><a href="https://www.newcies.gov.hk/en/" target="_blank" rel="noopener noreferrer">查看计划官方规则 ↗</a></p>`
  },
  study: {
    title: '香港留学进修',
    content: `<p>按学历、语言、专业与职业目标选择香港课程，衔接学生签证及毕业后的发展规划；读书本身不自动取得 IANG 或永久居民资格。</p><h3>适合人群</h3><p>希望通过本科、衔接学士或研究生课程提升学历和职业选择的学生与在职人士。</p><h3>申请要点</h3><p>课程的入学要求、全日制及本地评审状态、学位颁授机构、学制与费用。IANG 对非本地毕业生的课程及资历另有条件，不是所有进修课程毕业后都适用。</p><p><a href="https://www.immd.gov.hk/eng/services/visas/IANG.html" target="_blank" rel="noopener noreferrer">查看入境处 IANG 条件 ↗</a>　<a href="#education" data-close-project-detail>了解升学路径 →</a></p>`
  },
  renewal: {
    title: '香港身份续签服务',
    content: `<p>不同入境计划的续签条件各异。提前梳理在港工作、业务、家庭和居留安排，避免只关注首次获批而忽略后续发展。</p><h3>适合人群</h3><p>已持有人才、专业人士等入境许可、临近续签或需要重新规划在港发展的人士；首次申请不是由港恒办理亦可咨询。</p><h3>申请要点</h3><p>所持计划的续签规定、实际在港发展和申请时间。香港居民身份证不等于永久性居民身份证；连续通常居港不少于七年等法定条件须由入境处核实，并非“续签满七年自动转永居”。</p><p><a href="https://www.immd.gov.hk/eng/services/right-of-abode-in-hksar/apply.html" target="_blank" rel="noopener noreferrer">查看入境处居留权说明 ↗</a></p>`
  }
};

const projectModal = document.querySelector('.project-detail-modal');
const projectModalTitle = projectModal.querySelector('#project-detail-title');
const projectModalBody = projectModal.querySelector('.project-detail-body');
const projectModalScroll = projectModal.querySelector('.project-detail-scroll');
const projectModalClose = projectModal.querySelector('.project-detail-toolbar button');
const projectQrModal = document.querySelector('.project-qr-modal');
const projectQrClose = projectQrModal.querySelector('.project-qr-close');
const pathQuizResult = projectQrModal.querySelector('.path-quiz-result');
const pathQuizResultTitle = projectQrModal.querySelector('#path-quiz-result-title');
const pathQuizResultList = projectQrModal.querySelector('.path-quiz-result-list');
let projectTrigger = null;
let projectQrTrigger = null;

const openProjectDetail = card => {
  const detail = projectDetails[card.dataset.projectId];
  if (!detail) return;
  projectTrigger = card;
  projectModalTitle.textContent = detail.title;
  projectModalBody.innerHTML = detail.content;
  projectModal.hidden = false;
  document.body.classList.add('project-modal-open');
  projectModalScroll.scrollTop = 0;
  projectModalClose.focus();
};

const closeProjectDetail = () => {
  if (projectModal.hidden) return;
  projectModal.hidden = true;
  projectModalBody.innerHTML = '';
  document.body.classList.remove('project-modal-open');
  projectTrigger?.focus();
};

projectCards.forEach(card => {
  card.addEventListener('click', () => openProjectDetail(card));
  card.addEventListener('keydown', event => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    openProjectDetail(card);
  });
});
projectModal.querySelectorAll('[data-close-project-detail]').forEach(control => control.addEventListener('click', closeProjectDetail));
projectModalBody.addEventListener('click', event => {
  if (event.target.closest('[data-close-project-detail]')) closeProjectDetail();
});
const openProjectQr = (trigger, isQuiz = false) => {
  projectQrTrigger = trigger;
  projectQrModal.classList.toggle('quiz-mode', isQuiz);
  projectQrModal.setAttribute('aria-labelledby', isQuiz ? 'path-quiz-result-title' : 'project-qr-title');
  pathQuizResult.hidden = !isQuiz;
  projectQrModal.hidden = false;
  document.body.classList.add('project-modal-open');
  projectQrClose.focus();
};
const closeProjectQr = () => {
  if (projectQrModal.hidden) return;
  projectQrModal.hidden = true;
  if (projectModal.hidden) document.body.classList.remove('project-modal-open');
  projectQrTrigger?.focus();
};
projectModal.querySelector('[data-open-project-qr]').addEventListener('click', event => openProjectQr(event.currentTarget));
projectQrModal.querySelectorAll('[data-close-project-qr]').forEach(control => control.addEventListener('click', closeProjectQr));
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  if (!projectQrModal.hidden) {
    closeProjectQr();
  } else {
    closeProjectDetail();
  }
});

const pathQuizForm = document.querySelector('#path-quiz-form');
const pathQuizError = document.querySelector('#path-quiz-error');
const pathQuizProjects = {
  employer: ['香港专才计划', '已有香港雇主，可进一步核对岗位、薪酬及雇主资质。', 'professional'],
  quality: ['香港优才计划', '具备基本学历、工作经历及生活资金，可进一步评估综合计分制等要求。', 'quality'],
  talentB: ['高才通 B 类', '合资格大学学士学位及近五年的工作经验，适合进一步核对 B 类要求。', 'talent'],
  talentC: ['高才通 C 类', '近五年毕业且工作经验少于三年，可进一步核对院校名单、配额及其他限制。', 'talent'],
  talentA: ['高才通 A 类', '申请前一年的相关收入达到门槛，可进一步核对收入证明。', 'talent'],
  vtc: ['VTC 升学路径', '可了解适合高中毕业生的课程、入学条件及后续规划。', 'study'],
  topup: ['Top-up 专升本', '可了解专升本课程的学历衔接、入学要求及学习安排。', 'study'],
  investment: ['新资本投资者入境计划', '可进一步核对适用身份、净资产持有期及获许投资要求。', 'investment']
};

pathQuizForm.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(pathQuizForm);
  const basicEligible = formData.get('adult') === 'yes' && formData.get('record') === 'yes';
  const selected = [...pathQuizForm.querySelectorAll('.path-quiz-options input:checked')].map(input => input.value);
  if (basicEligible && selected.length === 0) {
    pathQuizError.hidden = false;
    return;
  }
  pathQuizError.hidden = true;
  pathQuizResultTitle.textContent = basicEligible ? '为您找到这些可考虑的方向' : '建议先与顾问确认申请条件';
  pathQuizResultList.replaceChildren();
  if (basicEligible) {
    selected.forEach(key => {
      const [title, description, projectId] = pathQuizProjects[key];
      const item = document.createElement('article');
      const titleEl = document.createElement('h4');
      const descriptionEl = document.createElement('p');
      const detailButton = document.createElement('button');
      titleEl.textContent = title;
      descriptionEl.textContent = description;
      detailButton.type = 'button';
      detailButton.textContent = '查看项目介绍 →';
      detailButton.addEventListener('click', () => {
        const card = document.querySelector(`[data-project-id="${projectId}"]`);
        if (card) {
          closeProjectQr();
          openProjectDetail(card);
        }
      });
      item.append(titleEl, descriptionEl, detailButton);
      pathQuizResultList.appendChild(item);
    });
  } else {
    const note = document.createElement('p');
    note.textContent = '本自测按年满 18 周岁、无犯罪记录作初步筛选。您的情况需要单独核对具体项目及院校要求。';
    pathQuizResultList.appendChild(note);
  }
  openProjectQr(pathQuizForm.querySelector('[type="submit"]'), true);
});
