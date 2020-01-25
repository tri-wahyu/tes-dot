import React, { Fragment } from 'react'

import Tabs from 'react-responsive-tabs';

import PageTitle from '../../../../Layout/AppMain/PageTitle';

// Examples
import AppHeader from '../../../../Layout/AppHeader';
import FormsFeedback from './Examples/Feedback';

const tabsContent = [
    {
        title: 'Feedback',
        content: <FormsFeedback />
    },

];

function getTabs() {
    return tabsContent.map((tab, index) => ({
        title: tab.title,
        getContent: () => tab.content,
        key: index,
    }));
}

class FormElementsValidation extends React.Component {

    render() {
        return (
            <Fragment>
                <AppHeader />
                {/* <PageTitle
                    heading="Pembayaran Pesanan"
                    subheading="menghitung biaya pembayaran pesan order makanan"
                    icon=""
                /> */}
                <FormsFeedback/>
            </Fragment>
        )
    }
}

export default FormElementsValidation;



