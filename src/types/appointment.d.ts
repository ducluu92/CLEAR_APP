interface IAppointment {
    end_date_time: string;
    id: number;
    location: string;
    notes: string;
    price: number;
    start_date_time: string;
    test_panel: string;
    view_url: string;
}

interface IAppointmentResponse {}
interface ILocation {
    id: number;
    name: string;
    calendar_id: string;
    belongs_to_clear: boolean;
    address: string;
}

