interface IAppointment {
    id: number;
    acuity_location: string;
    created_at: string;
    end_date_time: string;
    external_id: number;
    lims_syncronized: string;
    location: ICatalog;
    location_id: number;
    notes: string;
    price: number;
    result: IResult;
    start_date_time: string;
    test_panel: IPanel;
    test_panel_id: number;
    time_zone: string;
    updated_at: string;
    user: IAccount;
    user_id: number;
    view_url: string;
}

interface IAppointmentResponse {
    upcoming: IAppointment[];
    past: IAppointment[];
}
interface ILocation {
    id: number;
    name: string;
    calendar_id: string;
    belongs_to_clear: number;
    address: string;
    ratings_link: string;
    timezone_id: number;
    created_at: string;
    updated_at: string;
}

interface ITestKit {
    name: string;
    image: string;
    description: string;
    price: string;
    slug: string;
    is_best_choice: boolean;
}
