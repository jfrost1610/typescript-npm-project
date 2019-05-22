import * as request from 'request';
import { Repo } from './Repo';
import { User } from './User';

const OPTIONS: any = {
    headers: {
        'User-Agent': 'request'
    },
    proxy: '',
    rejectUnauthorized: false,
    json: true
}

export class GithubApiService {

    getUserInfo(userName: string, cb: (user: User) => any) {

        request.get('https://api.github.com/users/' + userName, OPTIONS,
            (error: any, response: any, body: any) => {
                cb(new User(body));
            });
    }

    getRepos(userName: string, cb: (repos: Repo[]) => any) {
        request.get('https://api.github.com/users/' + userName + '/repos', OPTIONS,
            (error: any, response: any, body: any) => {

                let repos = body.map(
                    (repo: any) => new Repo(repo)
                );

                cb(repos);
            });

    }
}