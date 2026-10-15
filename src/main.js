import './style.css';

const pages = [
    ['dashboard', 'Tableau de bord', '⌂'],
    ['planning', 'Planning', '▦'],
    ['courses', 'Cours', '▤'],
    ['reservations', 'Réservations', '◷'],
    ['halfboard', 'Demi-pensions', '♥'],
    ['riders', 'Cavaliers', '♙'],
    ['horses', 'Chevaux', '♞'],
    ['finances', 'Finances', '€'],
    ['documents', 'Documents', '□'],
    ['statistics', 'Statistiques', '▥'],
    ['users', 'Utilisateurs', '♙'],
    ['settings', 'Paramètres', '⚙']
];

let current = 'dashboard';
let planningOffset = 0;

const app = document.querySelector('#app');

function render() {
    app.innerHTML = `
        <div class="shell">
            <aside>
                <div class="brand">
                    <b>♞</b>

                    <div>
                        <strong>
                            Equi<span>Hub</span>
                        </strong>

                        <small>GESTION</small>
                    </div>
                </div>

                <nav>
                    ${pages
                        .map(
                            ([id, label, icon]) => `
                                <button
                                    class="nav ${current === id ? 'active' : ''}"
                                    data-page="${id}"
                                >
                                    <i>${icon}</i>
                                    ${label}
                                </button>
                            `
                        )
                        .join('')}
                </nav>

                <div class="profile">
                    <div class="avatar">A</div>

                    <div>
                        <strong>Compte gestion</strong>
                        <small>Administrateur</small>
                    </div>
                </div>
            </aside>

            <main>
                ${
                    current === 'dashboard'
                        ? dashboard()
                        : current === 'riders'
                            ? ridersPage()
                            : current === 'planning'
                                ? planningPage()
                                : current === 'courses'
                                    ? coursesPage()
                                    : current === 'reservations'
                                        ? reservationsPage()
                                        : current === 'halfboard'
                                            ? halfboardPage()
                                            : current === 'settings'
                                                ? settingsPage()
                                                : placeholder()
                }
            </main>
        </div>
    `;


    document
        .querySelectorAll('.nav')
        .forEach((button) => {

            button.onclick = () => {

                current = button.dataset.page;

                render();

            };

        });


    const riderSearch =
        document.querySelector('#riderSearch');


    riderSearch?.addEventListener(
        'input',
        () => {

            const search =
                riderSearch.value
                    .trim()
                    .toLowerCase();


            document
                .querySelectorAll('.rider-row')
                .forEach((row) => {

                    const text =
                        row.textContent.toLowerCase();


                    row.style.display =
                        text.includes(search)
                            ? ''
                            : 'none';

                });

        }
    );


    const previousWeek =
        document.querySelector('#previousWeek');


    previousWeek?.addEventListener(
        'click',
        () => {

            planningOffset--;

            render();

        }
    );


    const nextWeek =
        document.querySelector('#nextWeek');


    nextWeek?.addEventListener(
        'click',
        () => {

            planningOffset++;

            render();

        }
    );


    const todayButton =
        document.querySelector('#planningToday');


    todayButton?.addEventListener(
        'click',
        () => {

            planningOffset = 0;

            render();

        }
    );


    const halfboardSearch =
        document.querySelector('#halfboardSearch');


    halfboardSearch?.addEventListener(
        'input',
        () => {

            const search =
                halfboardSearch.value
                    .trim()
                    .toLowerCase();


            document
                .querySelectorAll('.halfboard-row')
                .forEach((row) => {

                    const text =
                        row.textContent.toLowerCase();


                    row.style.display =
                        text.includes(search)
                            ? ''
                            : 'none';

                });

        }
    );


    const courseSearch =
        document.querySelector('#courseSearch');


    courseSearch?.addEventListener(
        'input',
        () => {

            const search =
                courseSearch.value
                    .trim()
                    .toLowerCase();


            document
                .querySelectorAll('.course-row')
                .forEach((row) => {

                    const text =
                        row.textContent.toLowerCase();


                    row.style.display =
                        text.includes(search)
                            ? ''
                            : 'none';

                });

        }
    );
}

function dashboard() {
    return `
        <header>
            <div>
                <em>EQUIHUB GESTION</em>
                <h1>Tableau de bord</h1>
                <p>Vue d'ensemble de votre écurie</p>
            </div>

            <div class="actions">
                <button>⌕</button>
                <button>♧</button>
            </div>
        </header>

        <section class="stats">
            ${stat(
                'Cours aujourd’hui',
                '8',
                'Calendrier',
                'green'
            )}

            ${stat(
                'Cavaliers actifs',
                '42',
                'Membres',
                'blue'
            )}

            ${stat(
                'Chevaux',
                '18',
                'Écurie',
                'green'
            )}

            ${stat(
                'Demi-pensions',
                '6',
                'En cours',
                'orange'
            )}
        </section>

        <section class="grid">
            <article class="panel wide">
                <Head
                    t="Prochains cours"
                    s="Planning de la journée"
                />

                <div class="rows">
                    ${row(
                        '08:30',
                        'Galop 2',
                        '6 cavaliers',
                        'Caramel'
                    )}

                    ${row(
                        '10:00',
                        'Débutants',
                        '5 cavaliers',
                        'Ulysse'
                    )}

                    ${row(
                        '11:30',
                        'Galop 4',
                        '4 cavaliers',
                        'Ruby'
                    )}

                    ${row(
                        '14:00',
                        'Balade',
                        '3 cavaliers',
                        'Comète'
                    )}

                    ${row(
                        '16:00',
                        'Galop 3',
                        '6 cavaliers',
                        'Flash'
                    )}
                </div>
            </article>

            <article class="panel">
                <Head
                    t="Réservations récentes"
                    s="Dernières réservations"
                />

                <div class="reservations">
                    ${res(
                        'Léa Martin',
                        'Cours Galop 3',
                        'Confirmé'
                    )}

                    ${res(
                        'Tom Bernard',
                        'Balade',
                        'Confirmé'
                    )}

                    ${res(
                        'Emma Rossi',
                        'Cours Galop 2',
                        'En attente'
                    )}

                    ${res(
                        'Lucas Morel',
                        'Cours Adultes',
                        'Confirmé'
                    )}
                </div>
            </article>

            <article class="panel">
                <Head
                    t="Disponibilité des chevaux"
                    s="État actuel du troupeau"
                />

                <div class="horses">
                    ${horse('Caramel', 'Disponible')}
                    ${horse('Ulysse', 'En cours')}
                    ${horse('Ruby', 'Disponible')}
                    ${horse('Comète', 'Repos')}
                </div>
            </article>

            <article class="panel">
                <Head
                    t="Statistiques"
                    s="Activité des 30 derniers jours"
                />

                <div class="chart">
                    ${[35, 52, 42, 68, 58, 76, 88]
                        .map(
                            (x) =>
                                `<span style="height:${x}%"></span>`
                        )
                        .join('')}
                </div>
            </article>
        </section>
    `;
}

function stat(t, n, s, c) {
    return `
        <article class="stat ${c}">
            <div>
                <span>${t}</span>
                <strong>${n}</strong>
                <small>${s}</small>
            </div>

            <b>▣</b>
        </article>
    `;
}

function Head({ t, s }) {
    return `
        <div class="ph">
            <div>
                <h2>${t}</h2>
                <p>${s}</p>
            </div>

            <a>Voir tout</a>
        </div>
    `;
}

function row(a, b, c, d) {
    return `
        <div class="row">
            <b>${a}</b>
            <strong>${b}</strong>
            <span>${c}</span>
            <i>${d}</i>
        </div>
    `;
}

function res(n, a, s) {
    return `
        <div class="res">
            <b>${n[0]}</b>

            <div>
                <strong>${n}</strong>
                <small>${a}</small>
            </div>

            <em class="${s === 'En attente' ? 'pending' : ''}">
                ${s}
            </em>
        </div>
    `;
}

function horse(n, s) {
    return `
        <div class="horse">
            <div>♞</div>
            <strong>${n}</strong>
            <small>${s}</small>
        </div>
    `;
}

function ridersPage() {
    const riders = [
        {
            name: 'Léa Martin',
            level: 'Galop 3',
            phone: '06 12 34 56 78',
            email: 'lea.martin@email.fr',
            status: 'Actif',
            halfboard: 'Non'
        },
        {
            name: 'Tom Bernard',
            level: 'Galop 5',
            phone: '06 23 45 67 89',
            email: 'tom.bernard@email.fr',
            status: 'Actif',
            halfboard: 'Oui'
        },
        {
            name: 'Emma Rossi',
            level: 'Galop 2',
            phone: '06 34 56 78 90',
            email: 'emma.rossi@email.fr',
            status: 'Actif',
            halfboard: 'Non'
        },
        {
            name: 'Lucas Morel',
            level: 'Galop 4',
            phone: '06 45 67 89 01',
            email: 'lucas.morel@email.fr',
            status: 'Actif',
            halfboard: 'Oui'
        },
        {
            name: 'Chloé Petit',
            level: 'Galop 1',
            phone: '06 56 78 90 12',
            email: 'chloe.petit@email.fr',
            status: 'Actif',
            halfboard: 'Non'
        },
        {
            name: 'Hugo Blanc',
            level: 'Galop 6',
            phone: '06 67 89 01 23',
            email: 'hugo.blanc@email.fr',
            status: 'Inactif',
            halfboard: 'Non'
        },
        {
            name: 'Manon Faure',
            level: 'Galop 4',
            phone: '06 78 90 12 34',
            email: 'manon.faure@email.fr',
            status: 'Actif',
            halfboard: 'Oui'
        },
        {
            name: 'Nathan Girard',
            level: 'Galop 3',
            phone: '06 89 01 23 45',
            email: 'nathan.girard@email.fr',
            status: 'Actif',
            halfboard: 'Non'
        }
    ];

    const activeRiders = riders.filter(
        (rider) => rider.status === 'Actif'
    ).length;

    const halfboardRiders = riders.filter(
        (rider) => rider.halfboard === 'Oui'
    ).length;

    return `
        <header>
            <div>
                <em>EQUIHUB GESTION</em>

                <h1>Cavaliers</h1>

                <p>
                    Gestion des cavaliers de l'écurie
                </p>
            </div>

            <div class="actions">
                <button title="Rechercher">⌕</button>

                <button title="Notifications">♧</button>
            </div>
        </header>

        <section class="rider-top-stats">
            <article class="rider-stat">
                <span>Total cavaliers</span>
                <strong>${riders.length}</strong>
                <small>Inscrits dans l'écurie</small>
            </article>

            <article class="rider-stat">
                <span>Cavaliers actifs</span>
                <strong>${activeRiders}</strong>
                <small>Actuellement actifs</small>
            </article>

            <article class="rider-stat">
                <span>Demi-pensions</span>
                <strong>${halfboardRiders}</strong>
                <small>Cavaliers concernés</small>
            </article>
        </section>

        <section class="panel riders-panel">
            <div class="riders-toolbar">
                <div>
                    <h2>Liste des cavaliers</h2>

                    <p>
                        Retrouvez rapidement un cavalier
                        et ses informations.
                    </p>
                </div>

                <button
                    type="button"
                    class="primary rider-add-button"
                    id="addRiderButton"
                >
                    + Nouveau cavalier
                </button>
            </div>

            <div class="rider-search">
                <span>⌕</span>

                <input
                    type="search"
                    id="riderSearch"
                    placeholder="Rechercher un cavalier..."
                    autocomplete="off"
                />
            </div>

            <div class="rider-filters">
                <button class="rider-filter active">
                    Tous
                </button>

                <button class="rider-filter">
                    Actifs
                </button>

                <button class="rider-filter">
                    Demi-pensions
                </button>
            </div>

            <div class="riders-table-wrapper">
                <table class="riders-table">
                    <thead>
                        <tr>
                            <th>Cavalier</th>
                            <th>Niveau</th>
                            <th>Téléphone</th>
                            <th>E-mail</th>
                            <th>Statut</th>
                            <th>Demi-pension</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        ${riders
                            .map(
                                (rider) => `
                                    <tr class="rider-row">
                                        <td>
                                            <div class="rider-identity">
                                                <div class="rider-avatar">
                                                    ${rider.name[0]}
                                                </div>

                                                <strong>
                                                    ${rider.name}
                                                </strong>
                                            </div>
                                        </td>

                                        <td>
                                            <span class="rider-level">
                                                ${rider.level}
                                            </span>
                                        </td>

                                        <td>
                                            ${rider.phone}
                                        </td>

                                        <td>
                                            ${rider.email}
                                        </td>

                                        <td>
                                            <span
                                                class="rider-status ${
                                                    rider.status === 'Actif'
                                                        ? 'active'
                                                        : 'inactive'
                                                }"
                                            >
                                                ${rider.status}
                                            </span>
                                        </td>

                                        <td>
                                            <span
                                                class="rider-halfboard ${
                                                    rider.halfboard === 'Oui'
                                                        ? 'yes'
                                                        : 'no'
                                                }"
                                            >
                                                ${rider.halfboard}
                                            </span>
                                        </td>

                                        <td>
                                            <button
                                                type="button"
                                                class="rider-more"
                                                title="Voir le cavalier"
                                            >
                                                →
                                            </button>
                                        </td>
                                    </tr>
                                `
                            )
                            .join('')}
                    </tbody>
                </table>
            </div>
        </section>
    `;
}

function planningPage() {
    const today = new Date();

    const monday = new Date(today);
    monday.setHours(0, 0, 0, 0);

    const dayOfWeek = monday.getDay();

    const mondayOffset =
        dayOfWeek === 0
            ? -6
            : 1 - dayOfWeek;

    monday.setDate(
        monday.getDate() +
        mondayOffset +
        planningOffset * 7
    );

    const weekDays = Array.from(
        { length: 7 },
        (_, index) => {
            const date = new Date(monday);

            date.setDate(
                monday.getDate() + index
            );

            return date;
        }
    );

    const weekStart = weekDays[0];
    const weekEnd = weekDays[6];

    const formatWeekDate = (date) => {
        return date.toLocaleDateString(
            'fr-FR',
            {
                day: 'numeric',
                month: 'long'
            }
        );
    };

    const dayNames = [
        'Dimanche',
        'Lundi',
        'Mardi',
        'Mercredi',
        'Jeudi',
        'Vendredi',
        'Samedi'
    ];

    const shortDayNames = [
        'DIM',
        'LUN',
        'MAR',
        'MER',
        'JEU',
        'VEN',
        'SAM'
    ];

    const isSameDay = (dateA, dateB) => {
        return (
            dateA.getFullYear() === dateB.getFullYear() &&
            dateA.getMonth() === dateB.getMonth() &&
            dateA.getDate() === dateB.getDate()
        );
    };

    const courses = [
        {
            day: 0,
            start: '08:30',
            duration: '1h00',
            title: 'Galop 2',
            instructor: 'Claire',
            riders: 6,
            horse: 'Caramel',
            type: 'cours'
        },
        {
            day: 0,
            start: '10:00',
            duration: '1h00',
            title: 'Débutants',
            instructor: 'Claire',
            riders: 5,
            horse: 'Ulysse',
            type: 'cours'
        },
        {
            day: 0,
            start: '14:00',
            duration: '1h30',
            title: 'Balade',
            instructor: 'Thomas',
            riders: 3,
            horse: 'Comète',
            type: 'balade'
        },
        {
            day: 1,
            start: '09:00',
            duration: '1h00',
            title: 'Galop 3',
            instructor: 'Claire',
            riders: 6,
            horse: 'Flash',
            type: 'cours'
        },
        {
            day: 1,
            start: '15:30',
            duration: '1h00',
            title: 'Galop 5',
            instructor: 'Thomas',
            riders: 4,
            horse: 'Ruby',
            type: 'cours'
        },
        {
            day: 2,
            start: '10:00',
            duration: '1h00',
            title: 'Dressage',
            instructor: 'Claire',
            riders: 5,
            horse: 'Ulysse',
            type: 'dressage'
        },
        {
            day: 2,
            start: '14:30',
            duration: '1h30',
            title: 'Balade',
            instructor: 'Thomas',
            riders: 4,
            horse: 'Caramel',
            type: 'balade'
        },
        {
            day: 3,
            start: '09:30',
            duration: '1h00',
            title: 'Galop 2',
            instructor: 'Claire',
            riders: 6,
            horse: 'Flash',
            type: 'cours'
        },
        {
            day: 3,
            start: '16:00',
            duration: '1h00',
            title: 'Galop 4',
            instructor: 'Thomas',
            riders: 4,
            horse: 'Ruby',
            type: 'cours'
        },
        {
            day: 4,
            start: '08:30',
            duration: '1h00',
            title: 'Débutants',
            instructor: 'Claire',
            riders: 5,
            horse: 'Ulysse',
            type: 'cours'
        },
        {
            day: 4,
            start: '14:00',
            duration: '1h00',
            title: 'Galop 6',
            instructor: 'Thomas',
            riders: 4,
            horse: 'Flash',
            type: 'cours'
        },
        {
            day: 5,
            start: '10:30',
            duration: '1h30',
            title: 'Balade',
            instructor: 'Claire',
            riders: 6,
            horse: 'Comète',
            type: 'balade'
        },
        {
            day: 5,
            start: '15:00',
            duration: '1h00',
            title: 'Galop 3',
            instructor: 'Thomas',
            riders: 5,
            horse: 'Caramel',
            type: 'cours'
        },
        {
            day: 6,
            start: '09:30',
            duration: '1h00',
            title: 'Cours famille',
            instructor: 'Claire',
            riders: 4,
            horse: 'Ulysse',
            type: 'cours'
        }
    ];

    const hours = [
        '08:00',
        '09:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:00'
    ];

    const getCourseClass = (type) => {
        if (type === 'balade') {
            return 'planning-course balade';
        }

        if (type === 'dressage') {
            return 'planning-course dressage';
        }

        return 'planning-course';
    };

    const renderCourse = (course) => {
        return `
            <div class="${getCourseClass(course.type)}">
                <div class="planning-course-time">
                    ${course.start}
                    <span>${course.duration}</span>
                </div>

                <strong>
                    ${course.title}
                </strong>

                <small>
                    ${course.instructor}
                </small>

                <div class="planning-course-meta">
                    <span>
                        ♙ ${course.riders}
                    </span>

                    <span>
                        ♞ ${course.horse}
                    </span>
                </div>
            </div>
        `;
    };

    const renderDay = (dayDate, dayIndex) => {
        const dayCourses = courses.filter(
            (course) => course.day === dayIndex
        );

        const dateNumber = dayDate.getDate();

        return `
            <div
                class="
                    planning-day
                    ${isSameDay(dayDate, today) ? 'today' : ''}
                "
            >
                <div class="planning-day-header">
                    <span>
                        ${shortDayNames[dayDate.getDay()]}
                    </span>

                    <strong>
                        ${dateNumber}
                    </strong>
                </div>

                <div class="planning-day-content">
                    ${
                        dayCourses.length
                            ? dayCourses
                                  .map(renderCourse)
                                  .join('')
                            : `
                                <div class="planning-no-course">
                                    Aucun cours
                                </div>
                            `
                    }
                </div>
            </div>
        `;
    };

    return `
        <header>
            <div>
                <em>EQUIHUB GESTION</em>

                <h1>Planning</h1>

                <p>
                    Organisation des cours et activités de l'écurie
                </p>
            </div>

            <div class="actions">
                <button
                    type="button"
                    title="Rechercher"
                >
                    ⌕
                </button>

                <button
                    type="button"
                    title="Ajouter"
                >
                    +
                </button>
            </div>
        </header>

        <section class="planning-toolbar">
            <div class="planning-week-title">
                <strong>
                    Du ${formatWeekDate(weekStart)}
                    au ${formatWeekDate(weekEnd)}
                </strong>

                <span>
                    ${
                        planningOffset === 0
                            ? 'Semaine actuelle'
                            : 'Semaine du planning'
                    }
                </span>
            </div>

            <div class="planning-controls">
                <button
                    type="button"
                    id="planningToday"
                >
                    Aujourd'hui
                </button>

                <button
                    type="button"
                    id="previousWeek"
                    title="Semaine précédente"
                >
                    ‹
                </button>

                <button
                    type="button"
                    id="nextWeek"
                    title="Semaine suivante"
                >
                    ›
                </button>
            </div>
        </section>

        <section class="planning-summary">
            <article>
                <span>Cours cette semaine</span>
                <strong>${courses.length}</strong>
            </article>

            <article>
                <span>Cavaliers inscrits</span>
                <strong>64</strong>
            </article>

            <article>
                <span>Chevaux utilisés</span>
                <strong>6</strong>
            </article>

            <article>
                <span>Moniteurs</span>
                <strong>2</strong>
            </article>
        </section>

        <section class="planning-calendar">
            <div class="planning-week-header">
                ${weekDays
                    .map(
                        (day) => `
                            <div
                                class="
                                    planning-header-day
                                    ${
                                        isSameDay(day, today)
                                            ? 'today'
                                            : ''
                                    }
                                "
                            >
                                <span>
                                    ${dayNames[day.getDay()]}
                                </span>

                                <strong>
                                    ${day.getDate()}
                                </strong>
                            </div>
                        `
                    )
                    .join('')}
            </div>

            <div class="planning-grid">
                ${weekDays
                    .map((day, index) =>
                        renderDay(day, index)
                    )
                    .join('')}
            </div>
        </section>
    `;
}

function halfboardPage() {
    const contracts = [
        {
            rider: 'Tom Bernard',
            horse: 'Ruby',
            period: 'Lundi · Mercredi · Samedi',
            start: '01/09/2026',
            end: '30/06/2027',
            price: '180 € / mois',
            status: 'En cours'
        },
        {
            rider: 'Lucas Morel',
            horse: 'Comète',
            period: 'Mardi · Jeudi',
            start: '01/09/2026',
            end: '30/06/2027',
            price: '150 € / mois',
            status: 'En cours'
        },
        {
            rider: 'Manon Faure',
            horse: 'Caramel',
            period: 'Mercredi · Samedi · Dimanche',
            start: '15/09/2026',
            end: '30/06/2027',
            price: '210 € / mois',
            status: 'En cours'
        },
        {
            rider: 'Hugo Blanc',
            horse: 'Ulysse',
            period: 'Samedi',
            start: '01/10/2026',
            end: '31/03/2027',
            price: '95 € / mois',
            status: 'À venir'
        },
        {
            rider: 'Emma Rossi',
            horse: 'Flash',
            period: 'Lundi · Vendredi',
            start: '01/09/2026',
            end: '31/12/2026',
            price: '140 € / mois',
            status: 'En cours'
        }
    ];

    const activeContracts = contracts.filter(
        (contract) => contract.status === 'En cours'
    ).length;

    const upcomingContracts = contracts.filter(
        (contract) => contract.status === 'À venir'
    ).length;

    const monthlyRevenue = contracts
        .filter(
            (contract) =>
                contract.status === 'En cours'
        )
        .reduce((total, contract) => {
            const price = Number(
                contract.price.replace(/[^\d]/g, '')
            );

            return total + price;
        }, 0);

    return `
        <header>
            <div>
                <em>EQUIHUB GESTION</em>

                <h1>Demi-pensions</h1>

                <p>
                    Gestion des demi-pensions sur les chevaux de l'écurie
                </p>
            </div>

            <div class="actions">
                <button
                    type="button"
                    title="Rechercher"
                >
                    ⌕
                </button>

                <button
                    type="button"
                    title="Ajouter une demi-pension"
                >
                    +
                </button>
            </div>
        </header>

        <section class="halfboard-top-stats">
            <article class="halfboard-stat">
                <span>Demi-pensions actives</span>
                <strong>${activeContracts}</strong>
                <small>Contrats en cours</small>
            </article>

            <article class="halfboard-stat">
                <span>À venir</span>
                <strong>${upcomingContracts}</strong>
                <small>Contrats prochainement actifs</small>
            </article>

            <article class="halfboard-stat">
                <span>Chevaux concernés</span>
                <strong>${contracts.length}</strong>
                <small>Dans les contrats actuels</small>
            </article>

            <article class="halfboard-stat">
                <span>Montant mensuel</span>
                <strong>${monthlyRevenue} €</strong>
                <small>Contrats actuellement actifs</small>
            </article>
        </section>

        <section class="panel halfboard-panel">
            <div class="halfboard-toolbar">
                <div>
                    <h2>Contrats de demi-pension</h2>

                    <p>
                        Retrouvez les contrats, leurs dates et leurs conditions.
                    </p>
                </div>

                <button
                    type="button"
                    class="primary halfboard-add-button"
                    id="addHalfboardButton"
                >
                    + Nouvelle demi-pension
                </button>
            </div>

            <div class="halfboard-search">
                <span>⌕</span>

                <input
                    type="search"
                    id="halfboardSearch"
                    placeholder="Rechercher un cavalier ou un cheval..."
                    autocomplete="off"
                />
            </div>

            <div class="halfboard-filters">
                <button
                    type="button"
                    class="halfboard-filter active"
                >
                    Toutes
                </button>

                <button
                    type="button"
                    class="halfboard-filter"
                >
                    En cours
                </button>

                <button
                    type="button"
                    class="halfboard-filter"
                >
                    À venir
                </button>
            </div>

            <div class="halfboard-table-wrapper">
                <table class="halfboard-table">
                    <thead>
                        <tr>
                            <th>Cavalier</th>
                            <th>Cheval</th>
                            <th>Jours</th>
                            <th>Début</th>
                            <th>Fin</th>
                            <th>Tarif</th>
                            <th>Statut</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        ${contracts
                            .map(
                                (contract) => `
                                    <tr class="halfboard-row">
                                        <td>
                                            <div class="halfboard-rider">
                                                <div class="halfboard-avatar">
                                                    ${contract.rider[0]}
                                                </div>

                                                <strong>
                                                    ${contract.rider}
                                                </strong>
                                            </div>
                                        </td>

                                        <td>
                                            <div class="halfboard-horse">
                                                <span>♞</span>
                                                <strong>
                                                    ${contract.horse}
                                                </strong>
                                            </div>
                                        </td>

                                        <td>
                                            <span class="halfboard-days">
                                                ${contract.period}
                                            </span>
                                        </td>

                                        <td>
                                            <span class="halfboard-date">
                                                ${contract.start}
                                            </span>
                                        </td>

                                        <td>
                                            <span class="halfboard-date">
                                                ${contract.end}
                                            </span>
                                        </td>

                                        <td>
                                            <strong class="halfboard-price">
                                                ${contract.price}
                                            </strong>
                                        </td>

                                        <td>
                                            <span
                                                class="
                                                    halfboard-status
                                                    ${
                                                        contract.status === 'En cours'
                                                            ? 'active'
                                                            : 'upcoming'
                                                    }
                                                "
                                            >
                                                ${contract.status}
                                            </span>
                                        </td>

                                        <td>
                                            <button
                                                type="button"
                                                class="halfboard-more"
                                                title="Voir le contrat"
                                            >
                                                →
                                            </button>
                                        </td>
                                    </tr>
                                `
                            )
                            .join('')}
                    </tbody>
                </table>
            </div>
        </section>
    `;
}

function coursesPage() {
    const courses = [
        {
            date: '17/09/2026',
            time: '08:30',
            title: 'Galop 2',
            level: 'Galop 2',
            instructor: 'Claire',
            riders: 6,
            capacity: 8,
            horse: 'Caramel',
            status: 'Confirmé',
            type: 'Cours'
        },
        {
            date: '17/09/2026',
            time: '10:00',
            title: 'Débutants',
            level: 'Débutant',
            instructor: 'Claire',
            riders: 5,
            capacity: 6,
            horse: 'Ulysse',
            status: 'Confirmé',
            type: 'Cours'
        },
        {
            date: '17/09/2026',
            time: '14:00',
            title: 'Balade',
            level: 'Tous niveaux',
            instructor: 'Thomas',
            riders: 3,
            capacity: 5,
            horse: 'Comète',
            status: 'Complet',
            type: 'Balade'
        },
        {
            date: '17/09/2026',
            time: '16:00',
            title: 'Galop 4',
            level: 'Galop 4',
            instructor: 'Thomas',
            riders: 4,
            capacity: 6,
            horse: 'Ruby',
            status: 'Confirmé',
            type: 'Cours'
        },
        {
            date: '18/09/2026',
            time: '09:00',
            title: 'Galop 3',
            level: 'Galop 3',
            instructor: 'Claire',
            riders: 6,
            capacity: 6,
            horse: 'Flash',
            status: 'Complet',
            type: 'Cours'
        },
        {
            date: '18/09/2026',
            time: '15:30',
            title: 'Galop 5',
            level: 'Galop 5',
            instructor: 'Thomas',
            riders: 4,
            capacity: 6,
            horse: 'Ruby',
            status: 'Confirmé',
            type: 'Cours'
        },
        {
            date: '19/09/2026',
            time: '10:30',
            title: 'Balade',
            level: 'Tous niveaux',
            instructor: 'Claire',
            riders: 6,
            capacity: 6,
            horse: 'Comète',
            status: 'Complet',
            type: 'Balade'
        },
        {
            date: '19/09/2026',
            time: '15:00',
            title: 'Galop 3',
            level: 'Galop 3',
            instructor: 'Thomas',
            riders: 5,
            capacity: 8,
            horse: 'Caramel',
            status: 'Confirmé',
            type: 'Cours'
        }
    ];

    const totalCourses = courses.length;

    const confirmedCourses = courses.filter(
        (course) => course.status === 'Confirmé'
    ).length;

    const fullCourses = courses.filter(
        (course) => course.status === 'Complet'
    ).length;

    const totalRiders = courses.reduce(
        (total, course) => total + course.riders,
        0
    );

    return `
        <header>
            <div>
                <em>EQUIHUB GESTION</em>

                <h1>Cours</h1>

                <p>
                    Gestion des cours et des séances de l'écurie
                </p>
            </div>

            <div class="actions">
                <button
                    type="button"
                    title="Rechercher"
                >
                    ⌕
                </button>

                <button
                    type="button"
                    title="Ajouter un cours"
                >
                    +
                </button>
            </div>
        </header>

        <section class="course-top-stats">
            <article class="course-stat">
                <span>Cours programmés</span>
                <strong>${totalCourses}</strong>
                <small>Sur les prochains jours</small>
            </article>

            <article class="course-stat">
                <span>Cours confirmés</span>
                <strong>${confirmedCourses}</strong>
                <small>Planifiés normalement</small>
            </article>

            <article class="course-stat">
                <span>Cours complets</span>
                <strong>${fullCourses}</strong>
                <small>Capacité maximale atteinte</small>
            </article>

            <article class="course-stat">
                <span>Cavaliers inscrits</span>
                <strong>${totalRiders}</strong>
                <small>Total des inscriptions</small>
            </article>
        </section>

        <section class="panel courses-panel">
            <div class="courses-toolbar">
                <div>
                    <h2>Liste des cours</h2>

                    <p>
                        Gérez les séances, les inscriptions et les chevaux utilisés.
                    </p>
                </div>

                <button
                    type="button"
                    class="primary course-add-button"
                    id="addCourseButton"
                >
                    + Nouveau cours
                </button>
            </div>

            <div class="course-search">
                <span>⌕</span>

                <input
                    type="search"
                    id="courseSearch"
                    placeholder="Rechercher un cours, un moniteur ou un cheval..."
                    autocomplete="off"
                />
            </div>

            <div class="course-filters">
                <button
                    type="button"
                    class="course-filter active"
                >
                    Tous
                </button>

                <button
                    type="button"
                    class="course-filter"
                >
                    Cours
                </button>

                <button
                    type="button"
                    class="course-filter"
                >
                    Balades
                </button>

                <button
                    type="button"
                    class="course-filter"
                >
                    Complets
                </button>
            </div>

            <div class="courses-table-wrapper">
                <table class="courses-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Horaire</th>
                            <th>Cours</th>
                            <th>Niveau</th>
                            <th>Moniteur</th>
                            <th>Cavaliers</th>
                            <th>Cheval</th>
                            <th>Statut</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        ${courses
                            .map(
                                (course) => `
                                    <tr class="course-row">
                                        <td>
                                            <span class="course-date">
                                                ${course.date}
                                            </span>
                                        </td>

                                        <td>
                                            <strong class="course-time">
                                                ${course.time}
                                            </strong>
                                        </td>

                                        <td>
                                            <div class="course-name">
                                                <div
                                                    class="
                                                        course-type-icon
                                                        ${
                                                            course.type === 'Balade'
                                                                ? 'ride'
                                                                : ''
                                                        }
                                                    "
                                                >
                                                    ${
                                                        course.type === 'Balade'
                                                            ? '◌'
                                                            : '▤'
                                                    }
                                                </div>

                                                <strong>
                                                    ${course.title}
                                                </strong>
                                            </div>
                                        </td>

                                        <td>
                                            <span class="course-level">
                                                ${course.level}
                                            </span>
                                        </td>

                                        <td>
                                            <span class="course-instructor">
                                                ${course.instructor}
                                            </span>
                                        </td>

                                        <td>
                                            <div class="course-riders">
                                                <strong>
                                                    ${course.riders}
                                                </strong>

                                                <span>
                                                    / ${course.capacity}
                                                </span>
                                            </div>
                                        </td>

                                        <td>
                                            <div class="course-horse">
                                                <span>♞</span>

                                                <strong>
                                                    ${course.horse}
                                                </strong>
                                            </div>
                                        </td>

                                        <td>
                                            <span
                                                class="
                                                    course-status
                                                    ${
                                                        course.status === 'Complet'
                                                            ? 'full'
                                                            : 'confirmed'
                                                    }
                                                "
                                            >
                                                ${course.status}
                                            </span>
                                        </td>

                                        <td>
                                            <button
                                                type="button"
                                                class="course-more"
                                                title="Voir le cours"
                                            >
                                                →
                                            </button>
                                        </td>
                                    </tr>
                                `
                            )
                            .join('')}
                    </tbody>
                </table>
            </div>
        </section>
    `;
}

function reservationsPage() {
    if (!window.equiHubReservationCards) {
        window.equiHubReservationCards = [
            {
                rider: 'Léa Martin',
                package: 10,
                used: 4,
                reservedDates: [
                    '18/10/2026 · 16:30'
                ],
                validity: '31/12/2026',
                status: 'active',
                completedDates: [
                    '04/09/2026',
                    '11/09/2026',
                    '18/09/2026',
                    '02/10/2026'
                ]
            },
            {
                rider: 'Tom Bernard',
                package: 20,
                used: 12,
                reservedDates: [
                    '19/10/2026 · 11:00'
                ],
                validity: '31/01/2027',
                status: 'active',
                completedDates: [
                    '05/06/2026',
                    '12/06/2026',
                    '19/06/2026',
                    '26/06/2026',
                    '03/07/2026',
                    '10/07/2026',
                    '17/07/2026',
                    '24/07/2026',
                    '31/07/2026',
                    '07/08/2026',
                    '21/08/2026',
                    '04/09/2026'
                ]
            },
            {
                rider: 'Emma Rossi',
                package: 5,
                used: 5,
                reservedDates: [],
                validity: '30/11/2026',
                status: 'exhausted',
                completedDates: [
                    '03/09/2026',
                    '10/09/2026',
                    '17/09/2026',
                    '24/09/2026',
                    '01/10/2026'
                ]
            },
            {
                rider: 'Lucas Morel',
                package: 15,
                used: 3,
                reservedDates: [
                    '20/10/2026 · 14:00'
                ],
                validity: '15/02/2027',
                status: 'active',
                completedDates: [
                    '06/09/2026',
                    '13/09/2026',
                    '27/09/2026'
                ]
            },
            {
                rider: 'Chloé Petit',
                package: 10,
                used: 8,
                reservedDates: [
                    '21/10/2026 · 17:30'
                ],
                validity: '10/12/2026',
                status: 'soon',
                completedDates: [
                    '02/09/2026',
                    '09/09/2026',
                    '16/09/2026',
                    '23/09/2026',
                    '30/09/2026',
                    '03/10/2026',
                    '05/10/2026',
                    '07/10/2026'
                ]
            },
            {
                rider: 'Manon Faure',
                package: 20,
                used: 7,
                reservedDates: [],
                validity: '28/02/2027',
                status: 'active',
                completedDates: [
                    '08/09/2026',
                    '15/09/2026',
                    '22/09/2026',
                    '29/09/2026',
                    '01/10/2026',
                    '03/10/2026',
                    '06/10/2026'
                ]
            },
            {
                rider: 'Hugo Perrin',
                package: 5,
                used: 3,
                reservedDates: [
                    '22/10/2026 · 15:00'
                ],
                validity: '05/11/2026',
                status: 'soon',
                completedDates: [
                    '04/09/2026',
                    '18/09/2026',
                    '02/10/2026'
                ]
            }
        ];
    }


    const cards = window.equiHubReservationCards;


    cards.forEach((card) => {
        card.reserved = card.reservedDates.length;

        card.available = Math.max(
            card.package -
            card.used -
            card.reserved,
            0
        );

        if (
            card.available === 0 &&
            card.used < card.package
        ) {
            card.status = 'soon';
        }

        if (card.used >= card.package) {
            card.status = 'exhausted';
        }
    });


    const activeCards =
        cards.filter(
            card => card.status === 'active'
        ).length;


    const reservedLessons =
        cards.reduce(
            (total, card) =>
                total + card.reserved,
            0
        );


    const availableLessons =
        cards.reduce(
            (total, card) =>
                total + card.available,
            0
        );


    const soonExhausted =
        cards.filter(
            card => card.status === 'soon'
        ).length;


    const statusLabel = (status) => {
        if (status === 'active') {
            return 'Active';
        }

        if (status === 'soon') {
            return 'Bientôt épuisée';
        }

        if (status === 'exhausted') {
            return 'Épuisée';
        }

        return status;
    };


    const statusClass = (status) => {
        if (status === 'active') {
            return 'reservation-status-active';
        }

        if (status === 'soon') {
            return 'reservation-status-soon';
        }

        return 'reservation-status-exhausted';
    };


    const progress = (card) => {
        const consumed =
            card.used + card.reserved;

        const percentage =
            card.package > 0
                ? Math.round(
                    (consumed / card.package) * 100
                )
                : 0;

        return Math.min(
            percentage,
            100
        );
    };


    const openCardIndex =
        window.equiHubReservationDetail;


    const detailModal =
        openCardIndex !== undefined &&
        cards[openCardIndex]
            ? `
                <div
                    class="reservation-modal-overlay"
                    id="reservationModal"
                >

                    <div class="reservation-modal">

                        <div class="reservation-modal-header">

                            <div>

                                <span class="eyebrow">
                                    CARTE DE COURS PARTICULIERS
                                </span>

                                <h2>
                                    ${cards[openCardIndex].rider}
                                </h2>

                                <p>
                                    Carte de ${cards[openCardIndex].package} cours
                                    · Validité jusqu'au
                                    ${cards[openCardIndex].validity}
                                </p>

                            </div>


                            <button
                                type="button"
                                class="reservation-modal-close"
                                id="closeReservationModal"
                            >
                                ×
                            </button>

                        </div>


                        <div class="reservation-detail-summary">

                            <div>
                                <span>Cours effectués</span>

                                <strong>
                                    ${cards[openCardIndex].used}
                                </strong>
                            </div>


                            <div>
                                <span>Cours réservés</span>

                                <strong>
                                    ${cards[openCardIndex].reserved}
                                </strong>
                            </div>


                            <div>
                                <span>Cours disponibles</span>

                                <strong>
                                    ${cards[openCardIndex].available}
                                </strong>
                            </div>

                        </div>


                        <div class="reservation-detail-section">

                            <div class="reservation-detail-title">

                                <div>

                                    <h3>
                                        Cours effectués
                                    </h3>

                                    <p>
                                        Les cours déjà réalisés avec cette carte.
                                    </p>

                                </div>

                            </div>


                            <div class="reservation-history-list">

                                ${
                                    cards[openCardIndex]
                                        .completedDates
                                        .length > 0
                                        ? cards[openCardIndex]
                                            .completedDates
                                            .map(
                                                (date, index) => `
                                                    <div class="reservation-history-row">

                                                        <span class="reservation-history-number">
                                                            #${index + 1}
                                                        </span>

                                                        <span class="reservation-history-label">
                                                            Cours effectué
                                                        </span>

                                                        <strong>
                                                            ${date}
                                                        </strong>

                                                    </div>
                                                `
                                            )
                                            .join('')
                                        : `
                                            <div class="reservation-empty-state">
                                                Aucun cours effectué.
                                            </div>
                                        `
                                }

                            </div>

                        </div>


                        <div class="reservation-detail-section">

                            <div class="reservation-detail-title">

                                <div>

                                    <h3>
                                        Cours réservés
                                    </h3>

                                    <p>
                                        Les cours déjà planifiés.
                                    </p>

                                </div>

                            </div>


                            <div class="reservation-history-list">

                                ${
                                    cards[openCardIndex]
                                        .reservedDates
                                        .length > 0
                                        ? cards[openCardIndex]
                                            .reservedDates
                                            .map(
                                                (date, index) => `
                                                    <div class="reservation-history-row reserved">

                                                        <span class="reservation-history-number">
                                                            #${
                                                                cards[
                                                                    openCardIndex
                                                                ].used +
                                                                index +
                                                                1
                                                            }
                                                        </span>

                                                        <span class="reservation-history-label">
                                                            Cours réservé
                                                        </span>

                                                        <strong>
                                                            ${date}
                                                        </strong>

                                                    </div>
                                                `
                                            )
                                            .join('')
                                        : `
                                            <div class="reservation-empty-state">
                                                Aucun cours réservé.
                                            </div>
                                        `
                                }

                            </div>

                        </div>


                        <div class="reservation-detail-section reservation-new-booking">

                            <div class="reservation-detail-title">

                                <div>

                                    <h3>
                                        Ajouter une réservation
                                    </h3>

                                    <p>
                                        ${
                                            cards[openCardIndex].available > 0
                                                ? `${cards[openCardIndex].available} cours disponible(s) sur cette carte.`
                                                : 'Aucun cours disponible sur cette carte.'
                                        }
                                    </p>

                                </div>

                            </div>


                            ${
                                cards[openCardIndex].available > 0
                                    ? `
                                        <div class="reservation-date-form">

                                            <label for="newReservationDate">
                                                Date et heure du cours

                                                <input
                                                    id="newReservationDate"
                                                    type="datetime-local"
                                                >
                                            </label>


                                            <button
                                                type="button"
                                                class="primary"
                                                id="addReservationDate"
                                            >
                                                Ajouter le cours
                                            </button>

                                        </div>
                                    `
                                    : `
                                        <div class="reservation-no-availability">
                                            Cette carte n'a plus de cours disponible.
                                        </div>
                                    `
                            }

                        </div>

                    </div>

                </div>
            `
            : '';


    /*
     * Les événements sont installés une seule fois.
     *
     * Les données des cartes sont conservées dans
     * window.equiHubReservationCards afin de ne pas
     * perdre les réservations à chaque render().
     */

    if (!window.equiHubReservationEventsInitialized) {
        window.equiHubReservationEventsInitialized = true;


        document.addEventListener(
            'click',
            (event) => {

                const moreButton =
                    event.target.closest(
                        '.reservation-more'
                    );


                if (moreButton) {
                    const index =
                        Number(
                            moreButton.dataset.cardIndex
                        );


                    if (
                        Number.isInteger(index) &&
                        cards[index]
                    ) {
                        window.equiHubReservationDetail =
                            index;

                        render();
                    }

                    return;
                }


                const closeButton =
                    event.target.closest(
                        '#closeReservationModal'
                    );


                if (closeButton) {
                    delete window.equiHubReservationDetail;

                    render();

                    return;
                }


                const modal =
                    event.target.closest(
                        '#reservationModal'
                    );


                if (
                    modal &&
                    event.target === modal
                ) {
                    delete window.equiHubReservationDetail;

                    render();

                    return;
                }


                const addButton =
                    event.target.closest(
                        '#addReservationDate'
                    );


                if (addButton) {
                    const input =
                        document.querySelector(
                            '#newReservationDate'
                        );


                    if (!input || !input.value) {
                        alert(
                            'Sélectionne une date et une heure.'
                        );

                        return;
                    }


                    const index =
                        window.equiHubReservationDetail;


                    if (
                        index === undefined ||
                        !cards[index] ||
                        cards[index].available <= 0
                    ) {
                        return;
                    }


                    const date =
                        new Date(input.value);


                    if (
                        Number.isNaN(
                            date.getTime()
                        )
                    ) {
                        alert(
                            'La date sélectionnée est invalide.'
                        );

                        return;
                    }


                    const formattedDate =
                        date.toLocaleDateString(
                            'fr-FR'
                        );


                    const formattedTime =
                        date.toLocaleTimeString(
                            'fr-FR',
                            {
                                hour: '2-digit',
                                minute: '2-digit'
                            }
                        );


                    cards[index].reservedDates.push(
                        `${formattedDate} · ${formattedTime}`
                    );


                    cards[index].reserved =
                        cards[index]
                            .reservedDates
                            .length;


                    cards[index].available =
                        Math.max(
                            cards[index].package -
                            cards[index].used -
                            cards[index].reserved,
                            0
                        );


                    window.equiHubReservationDetail =
                        index;


                    render();

                    return;
                }


                const filterButton =
                    event.target.closest(
                        '.reservation-filter'
                    );


                if (filterButton) {
                    document
                        .querySelectorAll(
                            '.reservation-filter'
                        )
                        .forEach(
                            filter =>
                                filter.classList.remove(
                                    'active'
                                )
                        );


                    filterButton.classList.add(
                        'active'
                    );


                    const filter =
                        filterButton.dataset.filter;


                    document
                        .querySelectorAll(
                            '.reservation-row'
                        )
                        .forEach((row) => {

                            const status =
                                row.dataset.status;


                            row.style.display =
                                filter === 'all' ||
                                status === filter
                                    ? ''
                                    : 'none';

                        });

                    return;
                }


                const buyButton =
                    event.target.closest(
                        '#buyReservationCard'
                    );


                if (buyButton) {
                    alert(
                        'La création et l’achat de cartes seront ajoutés avec Supabase.'
                    );

                    return;
                }

            }
        );


        document.addEventListener(
            'input',
            (event) => {

                if (
                    !event.target.matches(
                        '#reservationSearch'
                    )
                ) {
                    return;
                }


                const search =
                    event.target.value
                        .trim()
                        .toLowerCase();


                document
                    .querySelectorAll(
                        '.reservation-row'
                    )
                    .forEach((row) => {

                        const rider =
                            row.dataset.rider || '';


                        row.style.display =
                            rider.includes(search)
                                ? ''
                                : 'none';

                    });

            }
        );
    }


    return `
        <section class="page reservations-page">

            <div class="page-header">

                <div>

                    <span class="eyebrow">
                        EQUIHUB GESTION
                    </span>

                    <h1>
                        Réservations
                    </h1>

                    <p>
                        Gestion des cartes de cours particuliers
                        et des réservations associées.
                    </p>

                </div>


                <button
                    type="button"
                    class="primary reservation-buy-button"
                    id="buyReservationCard"
                >
                    + Acheter une carte
                </button>

            </div>


            <div class="reservation-top-stats">

                <div class="stat-card">
                    <span class="stat-label">
                        Cartes actives
                    </span>

                    <strong>
                        ${activeCards}
                    </strong>

                    <small>
                        Cartes actuellement utilisables
                    </small>
                </div>


                <div class="stat-card">
                    <span class="stat-label">
                        Cours réservés
                    </span>

                    <strong>
                        ${reservedLessons}
                    </strong>

                    <small>
                        Cours déjà planifiés
                    </small>
                </div>


                <div class="stat-card">
                    <span class="stat-label">
                        Cours disponibles
                    </span>

                    <strong>
                        ${availableLessons}
                    </strong>

                    <small>
                        Cours encore utilisables
                    </small>
                </div>


                <div class="stat-card">
                    <span class="stat-label">
                        Cartes bientôt épuisées
                    </span>

                    <strong>
                        ${soonExhausted}
                    </strong>

                    <small>
                        Cartes avec peu de cours restants
                    </small>
                </div>

            </div>


            <div class="reservations-panel">

                <div class="reservations-toolbar">

                    <div>

                        <h2>
                            Cartes de cours particuliers
                        </h2>

                        <p>
                            Chaque réservation est liée à une carte.
                        </p>

                    </div>


                    <div class="reservation-search">

                        <span>⌕</span>

                        <input
                            id="reservationSearch"
                            type="search"
                            placeholder="Rechercher un cavalier..."
                            autocomplete="off"
                        >

                    </div>

                </div>


                <div class="reservation-filters">

                    <button
                        type="button"
                        class="reservation-filter active"
                        data-filter="all"
                    >
                        Toutes
                    </button>


                    <button
                        type="button"
                        class="reservation-filter"
                        data-filter="active"
                    >
                        Actives
                    </button>


                    <button
                        type="button"
                        class="reservation-filter"
                        data-filter="soon"
                    >
                        Bientôt épuisées
                    </button>


                    <button
                        type="button"
                        class="reservation-filter"
                        data-filter="exhausted"
                    >
                        Épuisées
                    </button>

                </div>


                <div class="reservations-table-wrapper">

                    <table class="reservations-table">

                        <thead>

                            <tr>
                                <th>Cavalier</th>
                                <th>Carte</th>
                                <th>Utilisés</th>
                                <th>Réservés</th>
                                <th>Disponibles</th>
                                <th>Progression</th>
                                <th>Validité</th>
                                <th>Statut</th>
                                <th></th>
                            </tr>

                        </thead>


                        <tbody>

                            ${cards
                                .map(
                                    (card, index) => `
                                        <tr
                                            class="reservation-row"
                                            data-status="${card.status}"
                                            data-rider="${card.rider.toLowerCase()}"
                                        >

                                            <td>

                                                <div class="reservation-rider">

                                                    <div class="reservation-avatar">
                                                        ${card.rider
                                                            .split(' ')
                                                            .map(
                                                                name =>
                                                                    name[0]
                                                            )
                                                            .join('')
                                                            .slice(0, 2)}
                                                    </div>


                                                    <div>

                                                        <strong>
                                                            ${card.rider}
                                                        </strong>

                                                        <small>
                                                            Carte #${index + 1}
                                                        </small>

                                                    </div>

                                                </div>

                                            </td>


                                            <td>
                                                <strong>
                                                    ${card.package} cours
                                                </strong>
                                            </td>


                                            <td>
                                                ${card.used}
                                            </td>


                                            <td>
                                                <span class="reservation-booked">
                                                    ${card.reserved}
                                                </span>
                                            </td>


                                            <td>
                                                <strong class="reservation-available">
                                                    ${card.available}
                                                </strong>
                                            </td>


                                            <td>

                                                <div class="reservation-progress-wrapper">

                                                    <div class="reservation-progress">

                                                        <span
                                                            style="width: ${progress(card)}%"
                                                        ></span>

                                                    </div>

                                                    <small>
                                                        ${progress(card)}%
                                                    </small>

                                                </div>

                                            </td>


                                            <td>
                                                ${card.validity}
                                            </td>


                                            <td>

                                                <span
                                                    class="reservation-status ${statusClass(card.status)}"
                                                >
                                                    ${statusLabel(card.status)}
                                                </span>

                                            </td>


                                            <td>

                                                <button
                                                    type="button"
                                                    class="reservation-more"
                                                    data-card-index="${index}"
                                                    title="Voir la carte"
                                                >
                                                    Voir
                                                </button>

                                            </td>

                                        </tr>
                                    `
                                )
                                .join('')}

                        </tbody>

                    </table>

                </div>

            </div>


            <div class="reservation-bottom-grid">

                <div class="reservation-upcoming">

                    <div class="reservation-section-header">

                        <div>

                            <h2>
                                Prochains cours particuliers
                            </h2>

                            <p>
                                Les réservations à venir.
                            </p>

                        </div>

                    </div>


                    <div class="reservation-upcoming-list">

                        ${
                            cards
                                .filter(
                                    card =>
                                        card.reservedDates.length > 0
                                )
                                .flatMap(
                                    card =>
                                        card.reservedDates.map(
                                            (date, index) => ({
                                                rider: card.rider,
                                                date,
                                                number:
                                                    card.used +
                                                    index +
                                                    1
                                            })
                                        )
                                )
                                .map(
                                    lesson => `
                                        <div class="reservation-upcoming-row">

                                            <div class="reservation-date">

                                                <strong>
                                                    ${lesson.date.split(' · ')[0]}
                                                </strong>

                                                <span>
                                                    ${lesson.date.split(' · ')[1] || ''}
                                                </span>

                                            </div>


                                            <div class="reservation-lesson-card">

                                                <strong>
                                                    ${lesson.rider}
                                                </strong>

                                                <span>
                                                    Cours particulier
                                                </span>

                                            </div>


                                            <div>

                                                <span class="reservation-example">
                                                    Cours #${lesson.number}
                                                </span>

                                            </div>

                                        </div>
                                    `
                                )
                                .join('')
                        }

                    </div>

                </div>


                <div class="reservation-info">

                    <div class="reservation-info-icon">
                        ℹ
                    </div>


                    <div>

                        <h3>
                            Fonctionnement des cartes
                        </h3>

                        <p>
                            Une carte correspond à un nombre
                            défini de cours particuliers.
                        </p>

                        <p>
                            Les cours effectués sont conservés
                            avec leur date.
                        </p>

                        <p>
                            Les cours réservés sont conservés
                            avec leur date prévue.
                        </p>

                        <p>
                            Chaque nouvelle réservation
                            consomme un cours disponible.
                        </p>

                    </div>

                </div>

            </div>


            ${detailModal}

        </section>
    `;
}

function settingsPage() {
    return `
        <header>
            <div>
                <em>EQUIHUB GESTION</em>

                <h1>Paramètres</h1>

                <p>
                    Configurez l'application et les informations de votre écurie
                </p>
            </div>
        </header>

        <section class="settings-layout">
            <div class="settings-main">
                <article class="panel settings-card">
                    <div class="settings-card-header">
                        <div class="settings-icon">
                            ⚙
                        </div>

                        <div>
                            <h2>Établissement</h2>

                            <p>
                                Informations générales de l'écurie
                            </p>
                        </div>
                    </div>

                    <div class="settings-form-grid">
                        <div class="settings-field">
                            <label for="stableName">
                                Nom de l'écurie
                            </label>

                            <input
                                id="stableName"
                                type="text"
                                value="Écurie EquiHub"
                            />
                        </div>

                        <div class="settings-field">
                            <label for="stablePhone">
                                Téléphone
                            </label>

                            <input
                                id="stablePhone"
                                type="tel"
                                value="04 00 00 00 00"
                            />
                        </div>

                        <div class="settings-field">
                            <label for="stableEmail">
                                E-mail
                            </label>

                            <input
                                id="stableEmail"
                                type="email"
                                value="contact@equihub.fr"
                            />
                        </div>

                        <div class="settings-field">
                            <label for="stableCity">
                                Ville
                            </label>

                            <input
                                id="stableCity"
                                type="text"
                                value="Grenoble"
                            />
                        </div>

                        <div class="settings-field full">
                            <label for="stableAddress">
                                Adresse
                            </label>

                            <input
                                id="stableAddress"
                                type="text"
                                value="12 chemin des Écuries"
                            />
                        </div>
                    </div>

                    <div class="settings-actions">
                        <button
                            type="button"
                            class="primary"
                        >
                            Enregistrer les informations
                        </button>
                    </div>
                </article>

                <article class="panel settings-card">
                    <div class="settings-card-header">
                        <div class="settings-icon">
                            ♙
                        </div>

                        <div>
                            <h2>Compte</h2>

                            <p>
                                Informations du compte connecté
                            </p>
                        </div>
                    </div>

                    <div class="settings-account">
                        <div class="settings-account-avatar">
                            A
                        </div>

                        <div class="settings-account-info">
                            <strong>Compte gestion</strong>

                            <span>
                                Administrateur
                            </span>

                            <small>
                                admin@equihub.fr
                            </small>
                        </div>

                        <button
                            type="button"
                            class="settings-secondary-button"
                        >
                            Modifier
                        </button>
                    </div>
                </article>

                <article class="panel settings-card">
                    <div class="settings-card-header">
                        <div class="settings-icon">
                            ◉
                        </div>

                        <div>
                            <h2>Notifications</h2>

                            <p>
                                Choisissez les notifications à recevoir
                            </p>
                        </div>
                    </div>

                    <div class="settings-options">
                        <label class="settings-option">
                            <div>
                                <strong>
                                    Nouvelles réservations
                                </strong>

                                <span>
                                    Recevoir une notification lorsqu'un cavalier réserve un cours.
                                </span>
                            </div>

                            <input
                                type="checkbox"
                                checked
                            />
                        </label>

                        <label class="settings-option">
                            <div>
                                <strong>
                                    Annulations
                                </strong>

                                <span>
                                    Être informé lorsqu'une réservation est annulée.
                                </span>
                            </div>

                            <input
                                type="checkbox"
                                checked
                            />
                        </label>

                        <label class="settings-option">
                            <div>
                                <strong>
                                    Rappels de cours
                                </strong>

                                <span>
                                    Recevoir des rappels concernant les cours à venir.
                                </span>
                            </div>

                            <input
                                type="checkbox"
                                checked
                            />
                        </label>
                    </div>
                </article>

                <article class="panel settings-card">
                    <div class="settings-card-header">
                        <div class="settings-icon">
                            ◐
                        </div>

                        <div>
                            <h2>Apparence</h2>

                            <p>
                                Personnalisez l'apparence d'EquiHub Gestion
                            </p>
                        </div>
                    </div>

                    <div class="settings-theme">
                        <button
                            type="button"
                            class="theme-choice active"
                        >
                            <span class="theme-preview dark-preview">
                                ◐
                            </span>

                            <div>
                                <strong>Sombre</strong>
                                <small>Interface sombre</small>
                            </div>
                        </button>

                        <button
                            type="button"
                            class="theme-choice"
                        >
                            <span class="theme-preview light-preview">
                                ☀
                            </span>

                            <div>
                                <strong>Clair</strong>
                                <small>Interface claire</small>
                            </div>
                        </button>

                        <button
                            type="button"
                            class="theme-choice"
                        >
                            <span class="theme-preview system-preview">
                                ◑
                            </span>

                            <div>
                                <strong>Système</strong>
                                <small>Utiliser le thème Windows</small>
                            </div>
                        </button>
                    </div>
                </article>
            </div>

            <div class="settings-side">
                <article class="panel settings-card">
                    <div class="settings-card-header">
                        <div class="settings-icon">
                            🔒
                        </div>

                        <div>
                            <h2>Sécurité</h2>

                            <p>
                                Gestion de la sécurité du compte
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        class="settings-link-button"
                    >
                        Modifier le mot de passe
                        <span>→</span>
                    </button>

                    <button
                        type="button"
                        class="settings-link-button"
                    >
                        Sessions connectées
                        <span>→</span>
                    </button>

                    <button
                        type="button"
                        class="settings-link-button"
                    >
                        Historique de connexion
                        <span>→</span>
                    </button>
                </article>

                <article class="panel settings-card">
                    <div class="settings-card-header">
                        <div class="settings-icon">
                            ℹ
                        </div>

                        <div>
                            <h2>Application</h2>

                            <p>
                                Informations sur EquiHub Gestion
                            </p>
                        </div>
                    </div>

                    <div class="settings-info-list">
                        <div>
                            <span>Version</span>
                            <strong>0.1.0</strong>
                        </div>

                        <div>
                            <span>Environnement</span>
                            <strong>Développement</strong>
                        </div>

                        <div>
                            <span>Backend</span>
                            <strong>Supabase</strong>
                        </div>

                        <div>
                            <span>Application Windows</span>
                            <strong>Tauri</strong>
                        </div>
                    </div>
                </article>

                <article class="panel settings-card danger-card">
                    <div class="settings-card-header">
                        <div class="settings-icon danger-icon">
                            !
                        </div>

                        <div>
                            <h2>Zone sensible</h2>

                            <p>
                                Actions nécessitant une attention particulière
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        class="danger-button"
                    >
                        Réinitialiser les paramètres locaux
                    </button>
                </article>
            </div>
        </section>
    `;
}

function placeholder() {
    const p = pages.find((x) => x[0] === current);

    return `
        <header>
            <div>
                <em>EQUIHUB GESTION</em>
                <h1>${p[1]}</h1>
                <p>Module en préparation.</p>
            </div>
        </header>

        <section class="empty">
            <b>${p[2]}</b>

            <h2>${p[1]}</h2>

            <p>
                Cet écran sera construit dans la prochaine étape.
            </p>
        </section>
    `;
}

render();