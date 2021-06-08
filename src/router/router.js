import Vue from 'vue'
import VueRouter from 'vue-router'

import Landing from "@/views/Landing";

import TournamentCreation from "@/views/creation/TournamentCreation";
import CreationSuccess from "@/views/creation/CreationSuccess";
import ManagingLanding from "@/views/managing/ManagingLanding";
import TournamentOverview from "@/views/managing/TournamentOverview"

import CreationAppBar from "@/components/toolbar/CreationAppBar";
import TournamentAppBar from "@/components/toolbar/TournamentAppBar";

import GroupStage from "@/views/GroupStage";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Landing',
        components: {
            default: Landing,
            toolbar: CreationAppBar
        }
    },
    {
        path: '/create',
        name: 'TournamentCreation',
        components: {
            default: TournamentCreation,
            toolbar: CreationAppBar
        }
    },
    {
        path: '/create/success',
        name: 'CreationSuccess',
        components: {
            default: CreationSuccess,
            toolbar: CreationAppBar
        }
    },
    {
        path: '/manage',
        name: 'ManagingLanding',
        components: {
            default: ManagingLanding,
            toolbar: CreationAppBar
        }
    },
    {
        path: '/overview/:tournamentId',
        name: 'TournamentOverview',
        components: {
            default: TournamentOverview,
            toolbar: CreationAppBar
        }
    },
    {
        path: '/groupstage',
        name: 'GroupStage',
        components: {
            default: GroupStage,
            toolbar: TournamentAppBar
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
