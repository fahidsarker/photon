export type TPhotonHighlight = {
    id: string;
    title: string;
    logo: string;
    description: string;
}

export class PhotonHighlight {

    static all = (): TPhotonHighlight[] => {
        return Object.values(this).slice(1)
    }

    static smartReliable: TPhotonHighlight = {
        id: 'smartReliable',
        title: 'Smart & Reliable',
        logo: '/logo/smart_reliable.svg',
        description: 'Photon is a modern code editor that runs on the browser. It is designed to be fast, reliable and easy to use. It is built with modern web technologies and is open source.'
    }

    static fastEfficient: TPhotonHighlight = {
        id: 'fastEfficient',
        title: 'Fast & Efficient',
        logo: '/logo/fast_efficient.svg',
        description: 'Photon used Judge0 api under the hood to run your code. It is fast and efficient. It supports more than 50+ programming languages and is open source.'
    }

    static privateSecure: TPhotonHighlight = {
        id: 'privateSecure',
        title: 'Private & Secure',
        logo: '/logo/private_secure.svg',
        description: 'Photon is completely transparent, private and secure. It does not store any of your code. It shres using url encoding and saves the code in you broswer cookies instead of a server.'
    }
}