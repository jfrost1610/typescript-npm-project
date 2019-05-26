import * as request from 'request';
import { Repo } from './Repo';
import { User } from './User';
import { Http2ServerResponse } from 'http2';

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

                if (error == null) {
                    if (response.headers.status === '200 OK') {
                        cb(new User(body));
                    } else {
                        console.error("Error in getting user response! Status :: ", response.headers.status);
                    }
                } else {
                    console.error("Error in getting user response! :: ", error);
                }
            });
    }

    getRepos(repoURL: string, cb: (repos: Repo[]) => any) {
        request.get(repoURL, OPTIONS,
            (error: any, response: any, body: any) => {

                if (error == null) {
                    if (response.headers.status === '200 OK') {

                        let repos = body.map(
                            (repo: any) => new Repo(repo)
                        );
                        cb(repos);

                    } else {
                        console.error("Error in getting repo response! Status :: ", response.headers.status);
                    }
                } else {
                    console.error("Error in getting repo response! :: ", error);
                }
            });

    }
}